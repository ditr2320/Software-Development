#!/bin/python3

""" This is random data generater for data collection.

You can run this script from terminal or import its 'generate_data' function.

You can edit the time format by editing the .config file.

You can generate the random data 1 year, 2 months, 3 days, 4 hours and 5 minutes before now by using command "data_generater.py --year 1 --month 2 --day 3 --hour 4 --minute 5".

You can print output to a csv file by appending "-f output.csv".

"""

import csv
import argparse
import datetime
import random

# Default time format. When the function was called from others, it use this format.
DEFAULT_FORMAT = "%d/%m/%Y %H:%M:%S"

time_format = DEFAULT_FORMAT

# Data generater function
def generate_data(seconds, span=30, lowtmp=23.0, hightmp=40.0, lowhum=33.0, highhum=50.0):
    """ Randomly generate temperature and humidity data N seconds before now.

    Parameters
    ----------
    seconds : int
        The time interval that you want the data to be generate in.
    span : int
        The time span between each row of data.
    lowtmp : float
        The lowest possible temperature it could generate.
    hightmp : float
        The highest possible temperature it could generate.
    lowhum : float
        The lowest possible humidity it could generate.
    hightmp : float
        The highest possible humidity it could generate.
    Returns
    -------
    data : array
        A array of generated data.
    """

    data = []

    now = datetime.datetime.now()
    before = now  - datetime.timedelta(seconds=seconds)

    random.seed(1)

    while before < now:

        temperature = random.uniform(lowtmp, hightmp)
        humidity = random.uniform(lowhum, highhum)
        str_datetime = before.strftime(time_format)

        data.append([temperature, humidity, str_datetime])

        before += datetime.timedelta(seconds=span)

    return data

pars = argparse.ArgumentParser()

pars.add_argument("-lt", "--lowtmp",
                  help="The lowest temperature.", type=float, default=23.0)

pars.add_argument("-ht", "--hightmp",
                  help="The highest temperature.", type=float, default=40.0)

pars.add_argument("-lh", "--lowhum",
                  help="The lowest humidity.", type=float, default=33.0)

pars.add_argument("-hh", "--highhum",
                  help="The highest humidity.", type=float, default=50.0)

pars.add_argument("-s", "--timespan",
                  help="The time span between two sets of data.", type=int, default=30)

pars.add_argument("-m", "--minute",
                  help="Generating data for the last n minutes.", type=int, default=0)

pars.add_argument("-hr", "--hour",
                  help="Generating data for the last n hours.", type=int, default=0)

pars.add_argument("-d", "--day",
                  help="Generating data for the last n days.", type=int, default=0)

pars.add_argument("-mt", "--month",
                  help="Generating data for the last n months.", type=int, default=0)

pars.add_argument("-y", "--year",
                  help="Generating data for the last n years.", type=int, default=0)

pars.add_argument("-f", "--file",
                  help="Write output to a csv file.", type=str)

args=pars.parse_args()

# Read time format from .config file.
with open(".config", "r") as conf:

    ls = conf.readlines()

    for l in ls:

        if not l[0] == "#":

            time_format = l.strip()

# Calculate the total seconds that in the time interval.
seconds = (args.year*12*30*24*60 + args.month*30*24*60 + args.day*24*60 + args.hour*60 + args.minute)*60

# Generate data
data = generate_data(seconds, args.timespan, args.lowtmp, args.hightmp, args.lowhum, args.highhum)

# If the file name is provided, write data to the file.
if args.file:

    print("Write data to file -> ", args.file)

    with open(args.file, "a") as f:

        writer = csv.writer(f)

        for d in data:

            writer.writerow(d)

# Otherwise print it to the terminal.
else:

    print("Data output:")

    for d in data:

        print(d)

