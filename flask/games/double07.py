#!/usr/bin/python3
'''
Double07 game class
'''
from __game import Game, Queue, PriorityQueue

class Double07(Game):
    def __init__(self, players, timer=12, **kwargs):
        '''
        Sets up the games default parameters.
        '''
        super().__init__(players, {'hp' : 3, 'ap': 1, 'defend': 'none'}, **kwargs)
        if self.socketio is not None:
            self.socketio.on_event('endOfRound', self.action)
        self.state['timer'] = timer
        self.__attack_queue = Queue()
        self.__target_queue = Queue()
        self.__other_queue = Queue()

    def action(self, data):
        '''
        Handles controller input, passes off input to a series of queues for later processing.
        '''
        print(data)
        if data['action'] == "attack":
            self.__attack_queue.put((data['player'], data['target']))
            self.__target_queue.put((data['player'], data['target']))
        else:
            self.__other_queue.put((data['player'], data['action']))


    def end_round(self):
        '''
        Inherited from Game. Handles game at the end of a round.
        Processes the queues one at a time to prioritize actions.
        First two queues setup defenses and reloads (not exclusively).
        Last queue handles attacks.
        '''
        while not self.__other_queue.empty():
            player, action = self.__other_queue.get()
            getattr(self, '_'+self.__name__+'__' + action)(player)
        while not self.__target_queue.empty():
            self.__target(*self.__target_queue.get())
        while not self.__attack_queue.empty():
            self.__attack(*self.__attack_queue.get())
        self.display()

    def display(self):
        '''
        Displays the game state to the console.
        '''
        print(self.state)
        if not self.active:
            self.print_standings()

    def run_game(self):
        '''
        Function that runs the gameloop from the server.
        '''
        timer = self.state['timer']
        while self.active:
            self.display_game.update(self.deepcopy)
            self.socketio.emit('state', self.state['players'], broadcast=True)
            while self.state['timer'] > 0:
                self.socketio.sleep(1)
                print(self.state['timer'])
                self.state['timer'] -= 1
                self.display_game.update(self.deepcopy)
            self.socketio.emit('timerExpired', broadcast=True)
            print("Waiting for inputs")
            self.socketio.sleep(2)
            print("Times up")
            self.end_round()
            self.state['timer'] -= 1
            self.display_game.update(self.deepcopy)
            self.rank_players()
            self.state['timer'] = timer
            super().run_game()

    def __defend(self, player):
        '''
        Handles logic for the defend action.
        '''
        self.state['players'][player]['defend'] = "all"
        self.state['players'][player]['ap'] -= 1

    def __reload(self, player):
        '''
        Handles logic for the reload action.
        '''
        self.state['players'][player]['defend'] = "none"
        self.state['players'][player]['ap'] += 1

    def __target(self, player, target):
        '''
        Handles defend logic for attack action.
        Sets defense to attacker to prevent double attacks.
        '''
        self.state['players'][player]['defend'] = target

    def __attack(self, player, target):
        '''
        Handles logic attack action.
        Handles different cases of success/failure.
        '''
        if self.state['players'][target]['defend'] == "all":
            self.state['players'][target]['ap'] += 1
            self.state['players'][player]['ap'] -= 1
        elif self.state['players'][target]['defend'] == player:
            self.state['players'][player]['ap'] -= 1
        elif type(self.state['players'][target]['hp']) == int:
            self.state['players'][target]['hp'] -= 1

    def rank_players(self):
        '''
        Ranks players based on order of death.
        Simultaneous deaths are tie-broken by the player with greater AP.
            If that is tied, it is broken arbitrarily
        '''
        dead = PriorityQueue()
        def check_dead():
            '''
            A local function to __rank_players().
            Adds players to ranking queue if they are dead.
            '''
            for player, stats in self.state['players'].items():
                if stats['hp'] != 'dead' and stats['hp'] <= 0:
                    dead.put((stats['ap'], player))
                    self.state['players'][player]['hp'] = 'dead'
                    self.remove_player()
            while not dead.empty():
                self.ranks.prepend(dead.get()[1])

        def check_alive():
            '''
            A local function to __rank_players().
            Returns a list of living players.
            '''
            for player, stats in self.state['players'].items():
                if stats['hp'] != 'dead':
                    yield player

        check_dead()
        alive = list(check_alive())
        if len(alive) < 2 and self.active:
            for player in alive:
                self.ranks.prepend(player)
            self.end_game()

if __name__ == '__main__':
    GAME = Double07(['A', 'B', 'C', 'D'])
    GAME.display()
    GAME.remove_player('D')
    GAME.display()
    GAME.action({'player': "C", 'action': 'defend'})
    GAME.action({'player': "B", 'action': 'reload'})
    GAME.action({'player': "A", 'action': 'attack', 'target': 'B'})
    GAME.end_round()    #test hit
    GAME.action({'player': "A", 'action': 'attack', 'target': 'B'})
    GAME.action({'player': "B", 'action': 'defend'})
    GAME.action({'player': "C", 'action': 'reload'})
    GAME.end_round()    # test defend
    GAME.action({'player': "A", 'action': 'reload'})
    GAME.action({'player': "B", 'action': 'attack', 'target': 'C'})
    GAME.action({'player': "C", 'action': 'attack', 'target': 'B'})
    GAME.end_round() # test simultaneous fire
    GAME.action({'player': "C", 'action': 'reload'})
    GAME.action({'player': "B", 'action': 'attack', 'target': 'C'})
    GAME.action({'player': "A", 'action': 'attack', 'target': 'B'})
    GAME.end_round()    # test hit
    GAME.action({'player': "C", 'action': 'attack', 'target': 'A'})
    GAME.action({'player': "B", 'action': 'attack', 'target': 'C'})
    GAME.action({'player': "A", 'action': 'attack', 'target': 'B'})
    GAME.end_round()    # test 3 way hit and death
    GAME.action({'player': "A", 'action': 'attack', 'target':'C'})
    GAME.action({'player': "C", 'action': 'reload'})
    GAME.end_round()   # should trigger end game
    GAME.end_round()

    GAME = Double07(['A', 'B', 'C'])
    GAME.action({'player': "A", 'action': 'reload'})
    GAME.action({'player': "C", 'action': 'defend'})
    GAME.action({'player': "B", 'action': 'reload'})
    GAME.end_round()
    GAME.action({'player': "A", 'action': 'defend'})
    GAME.action({'player': "C", 'action': 'reload'})
    GAME.action({'player': "B", 'action': 'reload'})
    GAME.end_round()
    GAME.action({'player': "C", 'action': 'attack', 'target': 'A'})
    GAME.action({'player': "B", 'action': 'attack', 'target': 'C'})
    GAME.action({'player': "A", 'action': 'attack', 'target': 'B'})
    GAME.end_round()
    GAME.action({'player': "C", 'action': 'attack', 'target': 'A'})
    GAME.action({'player': "B", 'action': 'attack', 'target': 'C'})
    GAME.action({'player': "A", 'action': 'attack', 'target': 'B'})
    GAME.end_round()
    GAME.action({'player': "C", 'action': 'attack', 'target': 'A'})
    GAME.action({'player': "B", 'action': 'attack', 'target': 'C'})
    GAME.action({'player': "A", 'action': 'attack', 'target': 'B'})
    GAME.end_round()   #triple kill
    GAME.end_round()

    GAME = Double07(map(chr, range(ord('a'), ord('z')+1)))
    GAME.display()
