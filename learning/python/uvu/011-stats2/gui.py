import math
from tkinter import * 
from tkinter.ttk import *
from matplotlib.figure import Figure
from matplotlib.backends.backend_tkagg import (FigureCanvasTkAgg, NavigationToolbar2Tk)
from matplotlib import axes

from myStats import *

BIN_COUNT = 100

class StatsGui:
    def __init__(self):
        self.introMaster = None
        self.simMaster = None
        self.compareMaster = None

        self.simCanvas = None
        self.simVar = None

        self.compareFigures = None
    
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
        width = 1070
        height = 690

        self.introMaster.destroy()

        self.compareMaster = Tk()

        xPos = int((self.compareMaster.winfo_screenwidth() - width) / 2)
        yPos = int((self.compareMaster.winfo_screenheight() - height) / 2 * 0.85)
        self.compareMaster.geometry(str(width) + "x" + str(height))
        self.compareMaster.geometry("+" + str(xPos) + "+" + str(yPos))

        Label(self.compareMaster, text='Exponential').grid(row = 0, column = 1, pady = 5)
        Label(self.compareMaster, text='Uniform').grid(row = 0, column = 2, pady = 5)
        Label(self.compareMaster, text='Weibull').grid(row = 0, column = 3, pady = 5)
        Label(self.compareMaster, text='Inverse\nTriangle').grid(row = 0, column = 4, pady = 5)

        tempCanvas = Canvas(self.compareMaster, width = 12, height = 50)
        tempCanvas.grid(row = 1, column = 0, padx = (7, 0))
        tempCanvas.create_text(6, 50, text = "Original", angle = 90, anchor = "w")
        
        # n, not x̅
        tempCanvas = Canvas(self.compareMaster, width = 12, height = 50)
        tempCanvas.grid(row = 2, column = 0, padx = (7, 0))
        tempCanvas.create_text(6, 50, text = "n = 5", angle = 90, anchor = "w")
        
        tempCanvas = Canvas(self.compareMaster, width = 12, height = 50)
        tempCanvas.grid(row = 3, column = 0, padx = (7, 0))
        tempCanvas.create_text(6, 50, text = "n = 30", angle = 90, anchor = "w")
        
        tempCanvas = Canvas(self.compareMaster, width = 12, height = 50)
        tempCanvas.grid(row = 4, column = 0, padx = (7, 0))
        tempCanvas.create_text(6, 50, text = "n = 100", angle = 90, anchor = "w")

        self.compareFigures = list()
        for x in range(16):
            compareFigure = Figure(figsize = (2.5, 1.5), dpi = 100)
            self.compareFigures.append(compareFigure)
            FigureCanvasTkAgg(compareFigure, master = self.compareMaster).get_tk_widget().grid(row = x // 4 + 1, column = x % 4 + 1, padx = 5, pady = 5)

        expo_norm = np.linspace(-1, 3, 100)
        unif_norm = np.linspace(0, 5, 100)

        # row one
        data = getExponData(50000, 1)
        simPlot = self.compareFigures[0].gca()
        # simPlot.axes.set_ylim(top=425)
        simPlot.axes.set_xlim((-1, 5))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(expo_norm, stats.norm.pdf(expo_norm, 1, 1), color = "yellow")
        simPlot.plot(expo_norm, stats.norm.pdf(expo_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = getUniformData(50000, 0, 5)
        simPlot = self.compareFigures[1].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = getWeibullData(50000, 1, 1.5)
        simPlot = self.compareFigures[2].gca()
        simPlot.axes.set_xlim((0, 3))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 1, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = getInverseTriangleData(50000, 0, 5)
        simPlot = self.compareFigures[3].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        # row two
        x = 5
        data = average_array(getExponData(50000, 1), x)
        simPlot = self.compareFigures[4].gca()
        simPlot.axes.set_xlim((-1, 5))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        simPlot.plot(expo_norm, stats.norm.pdf(expo_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getUniformData(50000, 0, 5), x)
        simPlot = self.compareFigures[5].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getWeibullData(50000, 1, 1.5), x)
        simPlot = self.compareFigures[6].gca()
        simPlot.axes.set_xlim((0, 3))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 1, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getInverseTriangleData(50000, 0, 5), x)
        simPlot = self.compareFigures[7].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        # row three
        x = 30
        data = average_array(getExponData(50000, 1), x)
        simPlot = self.compareFigures[8].gca()
        simPlot.axes.set_xlim((-1, 5))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        simPlot.plot(expo_norm, stats.norm.pdf(expo_norm, 1, math.sqrt(np.var(data))), color = "red")

        data = average_array(getUniformData(50000, 0, 5), x)
        simPlot = self.compareFigures[9].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getWeibullData(50000, 1, 1.5), x)
        simPlot = self.compareFigures[10].gca()
        simPlot.axes.set_xlim((0, 3))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 1, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getInverseTriangleData(50000, 0, 5), x)
        simPlot = self.compareFigures[11].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        # row four
        x = 100
        data = average_array(getExponData(50000, 1), x)
        simPlot = self.compareFigures[12].gca()
        simPlot.axes.set_xlim((-1, 5))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        simPlot.plot(expo_norm, stats.norm.pdf(expo_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getUniformData(50000, 0, 5), x)
        simPlot = self.compareFigures[13].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getWeibullData(50000, 1, 1.5), x)
        simPlot = self.compareFigures[14].gca()
        simPlot.axes.set_xlim((0, 3))
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 1, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")

        data = average_array(getInverseTriangleData(50000, 0, 5), x)
        simPlot = self.compareFigures[15].gca()
        simPlot.hist(data, bins = BIN_COUNT, density = True)
        # simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, 2.5, 1), color = "yellow")
        simPlot.plot(unif_norm, stats.norm.pdf(unif_norm, np.mean(data), math.sqrt(np.var(data))), color = "red")


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