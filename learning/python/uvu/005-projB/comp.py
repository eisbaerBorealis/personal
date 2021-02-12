import pathlib
import collections

filePath = pathlib.Path(__file__).parent.absolute()
fileNames = ['suppliers.txt', 'parts.txt', 'projects.txt', 'spj.txt']

Supplier = collections.namedtuple('Supplier', 'sno sname status city')
Part = collections.namedtuple('Part', 'pno pname color weight city')
Project = collections.namedtuple('Project', 'jno jname city')
Spj = collections.namedtuple('Spj', 'sno pno jno qty')

suppliers = set()
parts = set()
projects = set()
spj = set()

try:
    fp = open(str(filePath) + "/" + fileNames[0], 'r')
    for line in fp:
        # sno sname status city
        # s1,Smith,20,London
        line = line.rstrip()
        split = line.split(',')
        suppliers.add(Supplier(sno=split[0], sname=split[1], status=split[2], city=split[3]))
except FileNotFoundError:
    print("\nError: File not found. Please make sure " + fileNames[0] + " is in the same directory as this program and restart the program.")

try:
    fp = open(str(filePath) + "/" + fileNames[1], 'r')
    for line in fp:
        # pno pname color weight city
        # p1,Nut,Red,12,London
        line = line.rstrip()
        split = line.split(',')
        parts.add(Part(pno=split[0], pname=split[1], color=split[2], weight=split[3], city=split[4]))
except FileNotFoundError:
    print("\nError: File not found. Please make sure " + fileNames[1] + " is in the same directory as this program and restart the program.")

try:
    fp = open(str(filePath) + "/" + fileNames[2], 'r')
    for line in fp:
        # jno jname city
        # j1,Sorter,Paris
        line = line.rstrip()
        split = line.split(',')
        projects.add(Project(jno=split[0], jname=split[1], city=split[2].rstrip()))
except FileNotFoundError:
    print("\nError: File not found. Please make sure " + fileNames[2] + " is in the same directory as this program and restart the program.")

try:
    fp = open(str(filePath) + "/" + fileNames[3], 'r')
    for line in fp:
        # sno pno jno qty
        # s1,p1,j1,200
        line = line.rstrip()
        split = line.split(',')
        spj.add(Spj(sno=split[0], pno=split[1], jno=split[2], qty=split[3]))
except FileNotFoundError:
    print("\nError: File not found. Please make sure " + fileNames[3] + " is in the same directory as this program and restart the program.")

results = []

# 1. Get names of all suppliers that supply bolts.
results.append({s.sname for s in suppliers if s.sno in {
    r.sno for r in spj if r.pno in {
        p.pno for p in parts if p.pname == 'Bolt'
    }
}})

# 2. Get names of all suppliers that supply blue parts.
results.append({s.sname for s in suppliers if s.sno in {
    r.sno for r in spj if r.pno in {
        p.pno for p in parts if p.color == 'Blue'
    }
}})

# 3. Get names of all suppliers not used in Athens projects
results.append({s.sname for s in suppliers if s.sno not in {
    r.sno for r in spj if r.jno in {
        j.jno for j in projects if j.city == 'Athens'
    }
}})

# 4. Get names and colors of all parts not used in Oslo
results.append({(p.pname, p.color) for p in parts if p.pno not in {
    r.pno for r in spj if r.jno in {
        j.jno for j in projects if j.city == 'Oslo'
    }
}})

# 5. Get pairs of names of all suppliers that are located in the same city.
results.append({(s1.sname, s2.sname) for s1 in suppliers for s2 in suppliers if s1.city == s2.city and s1.sname > s2.sname})

# 6. Print all suppliers out by city
results.append({s1.city: {s2.sname for s2 in suppliers if s2.city == s1.city} for s1 in suppliers})

for result in results:
    print(result)