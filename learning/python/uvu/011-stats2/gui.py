from tkinter import * 
from tkinter.ttk import *
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import (FigureCanvasTkAgg, NavigationToolbar2Tk)

from myStats import *

BIN_COUNT = 100

class StatsGui:
    def __init__(self):
        self.introMaster = None
        self.simMaster = None
        self.compareMaster = None

        self.simCanvas = None
        self.simVar = None
    
    def openIntro(self):
        width = 200
        height = 200

        self.introMaster = Tk()

        xPos = int((self.introMaster.winfo_screenwidth() - width) / 2)
        yPos = int((self.introMaster.winfo_screenheight() - height) / 2 * 0.85)
        self.introMaster.geometry(str(width) + "x" + str(height))
        self.introMaster.geometry("+" + str(xPos) + "+" + str(yPos))

        introLabel1 = Label(self.introMaster,
            text = "Welcome to Group 9's Statistics\n" +
                    "Project for Professor Kyle Merril's\n" +
                    "ECE 3710 class, Spring 2021")
        introLabel1.configure(anchor="center")
        introLabel1.pack(pady = 10)

        introBtn1 = Button(self.introMaster, 
                    text ="Simulations", 
                    command = self.openSim)
        introBtn1.pack(pady = 10)

        introBtn2 = Button(self.introMaster, 
                    text ="4x4 graphs", 
                    command = self.open4x4)
        introBtn2.pack(pady = 10)

        introLabel2 = Label(self.introMaster,
            text = "Mitchell, Jesse, Christian, Jacob")
        introLabel2.pack(pady = 10)

        mainloop()

    def updateSimOptions(self, *args):
        distChoice = self.simVar.get()

        if distChoice == "Exponential":
            frameChildren = self.simMaster.winfo_children()[1].winfo_children()
            frameChildren[4].config(text = 'λ')
            frameChildren[6].config(text = '')
            frameChildren[3]['state'] = 'enabled'
            frameChildren[3].delete(0, 'end')
            frameChildren[3].insert(0, '50000')
            frameChildren[5]['state'] = 'enabled'
            frameChildren[5].delete(0, 'end')
            frameChildren[5].insert(0, '1')
            frameChildren[7]['state'] = 'disabled'
            frameChildren[7].delete(0, 'end')
            frameChildren[8]['state'] = 'enabled'
        elif distChoice == "Uniform":
            frameChildren = self.simMaster.winfo_children()[1].winfo_children()
            frameChildren[4].config(text = 'a')
            frameChildren[6].config(text = 'b')
            frameChildren[3]['state'] = 'enabled'
            frameChildren[3].delete(0, 'end')
            frameChildren[3].insert(0, '50000')
            frameChildren[5]['state'] = 'enabled'
            frameChildren[5].delete(0, 'end')
            frameChildren[5].insert(0, '0')
            frameChildren[7]['state'] = 'enabled'
            frameChildren[7].delete(0, 'end')
            frameChildren[7].insert(0, '5')
            frameChildren[8]['state'] = 'enabled'
        elif distChoice == "Weibull":
            frameChildren = self.simMaster.winfo_children()[1].winfo_children()
            frameChildren[4].config(text = 'λ (scale)')
            frameChildren[6].config(text = 'k (shape)')
            frameChildren[3]['state'] = 'enabled'
            frameChildren[3].delete(0, 'end')
            frameChildren[3].insert(0, '50000')
            frameChildren[5]['state'] = 'enabled'
            frameChildren[5].delete(0, 'end')
            frameChildren[5].insert(0, '1')
            frameChildren[7]['state'] = 'enabled'
            frameChildren[7].delete(0, 'end')
            frameChildren[7].insert(0, '1.5')
            frameChildren[8]['state'] = 'enabled'
        elif distChoice == "Inverse Triangle":
            frameChildren = self.simMaster.winfo_children()[1].winfo_children()
            frameChildren[4].config(text = 'a')
            frameChildren[6].config(text = 'b')
            frameChildren[3]['state'] = 'enabled'
            frameChildren[3].delete(0, 'end')
            frameChildren[3].insert(0, '50000')
            frameChildren[5]['state'] = 'enabled'
            frameChildren[5].delete(0, 'end')
            frameChildren[5].insert(0, '0')
            frameChildren[7]['state'] = 'enabled'
            frameChildren[7].delete(0, 'end')
            frameChildren[7].insert(0, '5')
            frameChildren[8]['state'] = 'enabled'

    def openSim(self):
        width = 600
        height = 600

        self.introMaster.destroy()

        self.simMaster = Tk()

        xPos = int((self.simMaster.winfo_screenwidth() - width) / 2)
        yPos = int((self.simMaster.winfo_screenheight() - height) / 2 * 0.85)
        self.simMaster.geometry(str(width) + "x" + str(height))
        self.simMaster.geometry("+" + str(xPos) + "+" + str(yPos))

        simFigure = Figure(figsize = (6, 5), dpi = 100)
        self.simCanvas = FigureCanvasTkAgg(simFigure, master = self.simMaster)
        self.simCanvas.get_tk_widget().pack()

        simPlot = simFigure.gca()

        simFrame = Frame(self.simMaster)
        simFrame.pack(side = BOTTOM)

        self.simVar = StringVar(self.simMaster)
        self.simVar.trace("w", self.updateSimOptions)
        dists = { 'Exponential', 'Uniform', 'Weibull', 'Inverse Triangle'}

        Label(simFrame, text="Choose a distribution: ").grid(row = 1, column = 1, rowspan = 3)
        simMenu = OptionMenu(simFrame, self.simVar, "None", *dists)
        simMenu.grid(row = 1, column = 2, rowspan = 3)

        nLabel = Label(simFrame, text="Sample size: ")
        nLabel.grid(row = 1, column = 3)
        nEntry = Entry(simFrame)
        nEntry.grid(row = 1, column = 4, pady = 5)

        aLabel = Label(simFrame, text="a: ")
        aLabel.grid(row = 2, column = 3)
        aEntry = Entry(simFrame)
        aEntry.grid(row = 2, column = 4, pady = 5)

        bLabel = Label(simFrame, text="b: ")
        bLabel.grid(row = 3, column = 3)
        bEntry = Entry(simFrame)
        bEntry.grid(row = 3, column = 4, pady = 5)

        simButton = Button(simFrame, text = "Simulate", command = self.updateSimPlot)
        simButton.grid(row = 1, column = 5, rowspan = 3, padx = 10)

        frameChildren = self.simMaster.winfo_children()[1].winfo_children()
        frameChildren[3]['state'] = 'disabled'
        frameChildren[5]['state'] = 'disabled'
        frameChildren[7]['state'] = 'disabled'
        frameChildren[8]['state'] = 'disabled'

    def open4x4(self):
        print('Debug, open4x4()')

    def updateEntries(self):
        print('Debug, updateEntries()')

    def popupWindow(self, msg):
        popup = Tk()
        popup.wm_title("Error(s)!")
        label = Label(popup, text=msg)
        label.pack(side="top", fill="x", pady=10, padx=10)
        B1 = Button(popup, text="Okay", command = popup.destroy)
        B1.pack(side="bottom", pady=10)

        width = 300
        height = 125
        xPos = int((popup.winfo_screenwidth() - width) / 2)
        yPos = int((popup.winfo_screenheight() - height) / 2 * 0.85)
        popup.geometry(str(width) + "x" + str(height))
        popup.geometry("+" + str(xPos) + "+" + str(yPos))

        popup.mainloop()

    def getInputError(self, input, min, max, target):
        error = ""
        
        try:
            test = float(input)
            if test < min:
                error = target + " must be at least " + str(min) + "\n"
            elif test > max:
                error = target + " must not be greater than " + str(max) + "\n"
        except:
            error = target + " needs to be a number\n"
        
        return error

    def updateSimPlot(self):
        distChoice = self.simVar.get()
        frameChildren = self.simMaster.winfo_children()[1].winfo_children()

        data = []
        errorString = ""

        if distChoice == "Exponential":
            errorString += self.getInputError(frameChildren[3].get(), 1, 10000000, "Sample size")
            errorString += self.getInputError(frameChildren[5].get(), 0.01, 100, "λ")
            if errorString == "":
                data = getExponData(int(frameChildren[3].get()), float(frameChildren[5].get()))
            else:
                self.popupWindow(errorString)
        elif distChoice == "Uniform":
            errorString += self.getInputError(frameChildren[3].get(), 1, 10000000, "Sample size")
            errorString += self.getInputError(frameChildren[5].get(), -1000000, 1000000, "a")
            errorString += self.getInputError(frameChildren[7].get(), -1000000, 1000000, "b")
            if errorString == "" and float(frameChildren[5].get()) >= float(frameChildren[7].get()):
                errorString += "a must be less than b"
            if errorString == "":
                data = getUniformData(int(frameChildren[3].get()), float(frameChildren[5].get()), float(frameChildren[7].get()))
            else:
                self.popupWindow(errorString)
        elif distChoice == "Weibull":
            errorString += self.getInputError(frameChildren[3].get(), 1, 10000000, "Sample size")
            errorString += self.getInputError(frameChildren[5].get(), 0.01, 100, "λ")
            errorString += self.getInputError(frameChildren[7].get(), 0.01, 100, "k")
            if errorString == "":
                data = getWeibullData(int(frameChildren[3].get()), float(frameChildren[5].get()), float(frameChildren[7].get()))
            else:
                self.popupWindow(errorString)
        elif distChoice == "Inverse Triangle":
            errorString += self.getInputError(frameChildren[3].get(), 1, 10000000, "Sample size")
            errorString += self.getInputError(frameChildren[5].get(), -1000000, 1000000, "a")
            errorString += self.getInputError(frameChildren[7].get(), -1000000, 1000000, "b")
            if errorString == "" and float(frameChildren[5].get()) >= float(frameChildren[7].get()):
                errorString += "a must be less than b"
            if errorString == "":
                data = getInverseTriangleData(int(frameChildren[3].get()), float(frameChildren[5].get()), float(frameChildren[7].get()))
            else:
                self.popupWindow(errorString)
        else:
            pass
        
        if len(data) > 0:
            self.simCanvas.get_tk_widget().pack_forget()
            simFigure = Figure(figsize = (6, 5), dpi = 100)
            self.simCanvas = FigureCanvasTkAgg(simFigure, master = self.simMaster)
            self.simCanvas.get_tk_widget().pack()
            simPlot = simFigure.gca()
            simPlot.hist(data, bins = BIN_COUNT)

gui = StatsGui()
gui.openIntro()