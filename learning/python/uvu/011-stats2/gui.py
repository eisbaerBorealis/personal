from tkinter import * 
from tkinter.ttk import *
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import (FigureCanvasTkAgg, NavigationToolbar2Tk)

from myStats import *

# temp
import scipy.stats as stats

introMaster = None
simMaster = None
compareMaster = None

simPlot = None

def openIntro():
    # try:
    #     global simMaster
    #     simMaster.destroy()
    # except AttributeError:
    #     print("simMaster cannot be destroyed (error handled. Yeah!)")

    global introMaster
    width = 200
    height = 200

    introMaster = Tk()
    introMaster.geometry("200x200")

    xPos = int((introMaster.winfo_screenwidth() - width) / 2)
    yPos = int((introMaster.winfo_screenheight() - height) / 2 * 0.85)
    introMaster.geometry(str(width) + "x" + str(height))
    introMaster.geometry("+" + str(xPos) + "+" + str(yPos))

    introLabel1 = Label(introMaster,
        text = "Welcome to Group 9's Statistics\n" +
                "Project for Professor Kyle Merril's\n" +
                "ECE 3710 class, Spring 2021")
    introLabel1.configure(anchor="center")
    introLabel1.pack(pady = 10)

    introBtn1 = Button(introMaster, 
                text ="Simulations", 
                command = openSim)
    introBtn1.pack(pady = 10)

    introBtn2 = Button(introMaster, 
                text ="4x4 graphs", 
                command = openSim)
    introBtn2.pack(pady = 10)

    introLabel2 = Label(introMaster,
        text = "Mitchell, Jesse, Christian, Jacob")
    introLabel2.pack(pady = 10)

def openSim():
    width = 600
    height = 550

    global introMaster
    introMaster.destroy()

    global simMaster
    simMaster = Tk()

    xPos = int((simMaster.winfo_screenwidth() - width) / 2)
    yPos = int((simMaster.winfo_screenheight() - height) / 2 * 0.85)
    simMaster.geometry(str(width) + "x" + str(height))
    simMaster.geometry("+" + str(xPos) + "+" + str(yPos))

    # simLabel = Label(simMaster,
    #     text = "Here's where the simulations will go")
    # simLabel.pack(pady = 10)

    simFigure = Figure(figsize = (6, 5), dpi = 100)
    simCanvas = FigureCanvasTkAgg(simFigure, master=simMaster)
    # simCanvas.get_tk_widget().grid(row=1, column=3, rowspan=6)
    simCanvas.get_tk_widget().pack()

    global simPlot
    simPlot = simFigure.gca()
    # simPlot.hist(getExponData(50000), bins = 100)
    # simPlot.set_xlabel('Median Value', fontsize = 15)
    # simPlot.set_ylabel('Frequency', fontsize = 15)
    # canvas.show()

    simFrame = Frame(simMaster)
    simFrame.pack(side = BOTTOM)

    simVar = StringVar(simFrame)
    dists = { 'None','Exponential','Uniform'}
    simVar.set('None')

    simMenu = OptionMenu(simFrame, simVar, *dists)
    Label(simFrame, text="Choose a distribution").grid(row = 1, column = 1)
    simMenu.grid(row = 1, column = 2)

    simButton = Button(simFrame, text = "Simulate", command = updateSimPlot(simVar.get()))
    # simButton.pack(side = RIGHT)
    simButton.grid(row = 1, column = 3)

def updateSimPlot(distChoice):
    # simPlot.hist(getExponData(50000), bins = 100)
    if distChoice == "Exponential":
        global simPlot
        simPlot.clear()
        simPlot.hist(getExponData(50000), bins = 100)

openIntro()
mainloop()