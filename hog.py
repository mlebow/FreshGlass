"""The Game of Hog."""

from dice import four_sided, six_sided, make_test_dice
from ucb import main, trace, log_current_line, interact

GOAL_SCORE = 100 # The goal of Hog is to score 100 points.

######################
# Phase 1: Simulator #
######################

# Taking turns

def roll_dice(num_rolls, dice=six_sided):
    """Roll DICE for NUM_ROLLS times.  Return either the sum of the outcomes,
    or 1 if a 1 is rolled (Pig out). This calls DICE exactly NUM_ROLLS times.

    num_rolls:  The number of dice rolls that will be made; at least 1.
    dice:       A zero-argument function that returns an integer outcome.
    """
    # These assert statements ensure that num_rolls is a positive integer.
    assert type(num_rolls) == int, 'num_rolls must be an integer.'
    assert num_rolls > 0, 'Must roll at least once.'
    roll_sum = 0
    while num_rolls > 0:
        roll_val = dice()
        if roll_val == 1:
            roll_sum = 1
            num_rolls = 0
        else:
            roll_sum += roll_val
            num_rolls -= 1
    return roll_sum

switches =0

def take_turn(num_rolls, opponent_score, dice=six_sided):
    """Simulate a turn rolling NUM_ROLLS dice, which may be 0 (Free bacon).

    num_rolls:       The number of dice rolls that will be made.
    opponent_score:  The total score of the opponent.
    dice:            A function of no args that returns an integer outcome.
    """

    assert type(num_rolls) == int, 'num_rolls must be an integer.'
    assert num_rolls >= -1, 'Cannot roll a negative number of dice.'
    assert num_rolls <= 10, 'Cannot roll more than 10 dice.'
    assert opponent_score < 100, 'The game should be over.'
    global switches
    if num_rolls == -1:
        switches += 1
        return 1
    elif num_rolls == 0:
        if opponent_score > 9:
            c = max(opponent_score % 10, opponent_score // 10)
        elif opponent_score < 10:
            c = opponent_score
        return 1 + c
    else:
        return roll_dice(num_rolls, dice)

# Playing a game

def select_dice(score, opponent_score):
    """Select six-sided dice unless the sum of SCORE and OPPONENT_SCORE is a
    multiple of 7, in which case select four-sided dice (Hog wild).
    """

    if switches % 2 ==0:
        if (score + opponent_score) % 7 == 0:
            dice = four_sided
        else:
            dice = six_sided
        return dice
    else:
        if (score + opponent_score) % 7 == 0:
            dice = six_sided
        else:
            dice = four_sided
        return dice

def other(who):
    """Return the other player, for a player WHO numbered 0 or 1.

    >>> other(0)
    1
    >>> other(1)
    0
    """
    return 1 - who

def play(strategy0, strategy1, goal=GOAL_SCORE):
    """Simulate a game and return the final scores of both players, with
    Player 0's score first, and Player 1's score second.

    A strategy is a function that takes two total scores as arguments
    (the current player's score, and the opponent's score), and returns a
    number of dice that the current player will roll this turn.

    strategy0:  The strategy function for Player 0, who plays first.
    strategy1:  The strategy function for Player 1, who plays second.
    """
    who = 0  # Which player is about to take a turn, 0 (first) or 1 (second)
    score, opponent_score = 0, 0
    strategy, opponent_strategy = strategy0, strategy1

    def swaparoo():
        nonlocal score, opponent_score, strategy, opponent_strategy, who
        #swap each of the player's values
        score, opponent_score, strategy, opponent_strategy, who = opponent_score, score, opponent_strategy, strategy, other(who)

    while score < goal and opponent_score < goal:
        num_dice, dice = strategy(score, opponent_score), select_dice(score, opponent_score)
        score += take_turn(num_dice, opponent_score, dice)
        if score / 2 == opponent_score or opponent_score / 2 == score:
            score, opponent_score = opponent_score, score
        swaparoo()

    if who == 1:
        return opponent_score, score
        
    return score, opponent_score  # You may wish to change this line.




#######################
# Phase 2: Strategies #
#######################

# Basic Strategy


def always_roll(n):
    """Return a strategy that always rolls N dice.

    A strategy is a function that takes two total scores as arguments
    (the current player's score, and the opponent's score), and returns a
    number of dice that the current player will roll this turn.

    >>> strategy = always_roll(5)
    >>> strategy(0, 0)
    5
    >>> strategy(99, 99)
    5
    """
    def strategy(score, opponent_score):
        return n
    return strategy

# Experiments

def make_averaged(fn, num_samples=1000):
    """Return a function that returns the average_value of FN when called.

    To implement this function, you will have to use *args syntax, a new Python
    feature introduced in this project.  See the project description.

    >>> dice = make_test_dice(3, 1, 5, 6)
    >>> averaged_dice = make_averaged(dice, 1000)
    >>> averaged_dice()
    3.75
    >>> make_averaged(roll_dice, 1000)(2, dice)
    6.0

    In this last example, two different turn scenarios are averaged.
    - In the first, the player rolls a 3 then a 1, receiving a score of 1.
    - In the other, the player rolls a 5 and 6, scoring 11.
    Thus, the average value is 6.0.
    """
    def func(*args):
        e, average_value = 0, 0
        while e < num_samples:
            average_value += fn(*args)
            e += 1
        average_value /= num_samples
        return average_value
    return func

def max_scoring_num_rolls(dice=six_sided):
    """Return the number of dice (1 to 10) that gives the highest average turn
    score by calling roll_dice with the provided DICE.  Print all averages as in
    the doctest below.  Assume that dice always returns positive outcomes.

    >>> dice = make_test_dice(3)
    >>> max_scoring_num_rolls(dice)
    1 dice scores 3.0 on average
    2 dice scores 6.0 on average
    3 dice scores 9.0 on average
    4 dice scores 12.0 on average
    5 dice scores 15.0 on average
    6 dice scores 18.0 on average
    7 dice scores 21.0 on average
    8 dice scores 24.0 on average
    9 dice scores 27.0 on average
    10 dice scores 30.0 on average
    10
    """
    num_rolls, max_score = 1, 0

    while num_rolls <= 10 :

        current_rolls_avg = make_averaged(roll_dice, 100)(num_rolls, dice)

        #if the value from the current rolls is greater than the previous maximum, switch
        if current_rolls_avg > max_score:
            max_score = current_rolls_avg
            best_num_rolls = num_rolls

        print(num_rolls, "dice scores", current_rolls_avg, "on average")

        num_rolls += 1

    return best_num_rolls




def winner(strategy0, strategy1):
    """Return 0 if strategy0 wins against strategy1, and 1 otherwise."""
    score0, score1 = play(strategy0, strategy1)
    if score0 > score1:
        return 0
    else:
        return 1

def average_win_rate(strategy, baseline=always_roll(5)):
    """Return the average win rate (0 to 1) of STRATEGY against BASELINE."""
    win_rate_as_player_0 = 1 - make_averaged(winner)(strategy, baseline)
    win_rate_as_player_1 = make_averaged(winner)(baseline, strategy)
    return (win_rate_as_player_0 + win_rate_as_player_1) / 2 # Average results

def run_experiments():
    """Run a series of strategy experiments and report results."""
    if False: # Change to False when done finding max_scoring_num_rolls
        six_sided_max = max_scoring_num_rolls(six_sided)
        print('Max scoring num rolls for six-sided dice:', six_sided_max)
        four_sided_max = max_scoring_num_rolls(four_sided)
        print('Max scoring num rolls for four-sided dice:', four_sided_max)

    if False: # Change to True to test always_roll(8)
        print('always_roll(8) win rate:', average_win_rate(always_roll(8)))

    if False: # Change to True to test bacon_strategy
        print('bacon_strategy win rate:', average_win_rate(bacon_strategy))

    if True: # Change to True to test swap_strategy
        print('swap_strategy win rate:', average_win_rate(swap_strategy))

    if False: # Change to True to test final_strategy
        print('final_strategy win rate:', average_win_rate(final_strategy))

    "*** You may add additional experiments as you wish ***"

# Strategies

def bacon_strategy(score, opponent_score, margin=8, num_rolls=5):
    """This strategy rolls 0 dice if that gives at least MARGIN points,
    and rolls NUM_ROLLS otherwise.
    """
    if take_turn(0, opponent_score, dice=six_sided) >= margin:
        return 0
    else:
        return num_rolls

def swap_strategy(score, opponent_score, margin=8, num_rolls=5):
    """This strategy rolls 0 dice when it would result in a beneficial swap and
    rolls NUM_ROLLS if it would result in a harmful swap. It also rolls
    0 dice if that gives at least MARGIN points and rolls
    NUM_ROLLS otherwise.
    """
    global bacon_score
    def bacon_score():
        return score + take_turn(bacon_strategy(score, opponent_score, 0), opponent_score, select_dice)
    if 2 * (bacon_score()) == opponent_score:
        return 0
    elif .5 * (bacon_score()) == opponent_score:
        return num_rolls
    elif bacon_strategy(score, opponent_score) == 0:
        return bacon_strategy(score, opponent_score)
    return num_rolls



def behind(score, opponent_score):
    """this function returns the score from subtracting player 1's score from player 2's score
    - giving however many points player1 is behind"""
    return opponent_score - score

def ahead(score, opponent_score):
    """this function returns the score from subtracting player 2's score from player 1's score 
    - giving however many points player1 is ahead"""
    return score - opponent_score

def final_strategy(score, opponent_score):
    """
    Implements swap_strategy and bacon_strategy as well as picks optimal move 
    for 4 and 6 sided dice. By integrating the behind and ahead functions, final_strategy
    tells how risky or safely to play depending on how far or behind the player is. 

    Also checks to see if swap_strategy would take place if score is 1 point away from being exactly 
    half of opponent_score, then chooses to roll 10 dice, thereby maximizing the chance of rolling a 
    1 and receiving a 1 score.

    """

    def normal_roll(score, opponent_score):
        if score >= 90 and opponent_score <= 85:
            q, r = 4, 3
        elif opponent_score > 85:
            if score >= 90:
                q, r = 7, 5
            elif score <= 70:
                q, r = 8, 6
            else:
                q, r = 5, 3
        elif behind(score, opponent_score) >= 50:
            q, r = 9, 5
        elif behind(score, opponent_score) >= 35:
            q, r = 8, 4
        elif behind(score, opponent_score) > 20:
            q, r = 7, 4
        elif ahead(score, opponent_score) >= 50:
            q, r = 4, 3
        elif ahead(score, opponent_score) >= 30:
            q, r = 5, 3
        elif ahead(score, opponent_score) > 20:
            q, r = 6, 3
        else:
            q, r = 6, 4
        if select_dice(score, opponent_score) == six_sided:
            return q
        else:
            return r
    if 100 - score <= take_turn(0, opponent_score, six_sided):
        return 0
    if 2 * (1 + score) == opponent_score:
        return 10 
    if swap_strategy(score, opponent_score, 8, 5) == 0:
        return 0 
    elif bacon_strategy(score, opponent_score, 9, 5) == 0:
        return 0
    elif .5 * (bacon_score()) == opponent_score:
        return normal_roll(score, opponent_score)
    elif (bacon_score() + opponent_score) % 7 == 0:
        return 0
    else:
        return normal_roll(score, opponent_score)



##########################
# Command Line Interface #
##########################

# Note: Functions in this section do not need to be changed.  They use features
#       of Python not yet covered in the course.


@main
def run(*args):
    """Read in the command-line argument and calls corresponding functions.

    This function uses Python syntax/techniques not yet covered in this course.
    """
    import argparse
    parser = argparse.ArgumentParser(description="Play Hog")
    parser.add_argument('--run_experiments', '-r', action='store_true',
                        help='Runs strategy experiments')
    args = parser.parse_args()

    if args.run_experiments:
        run_experiments()
