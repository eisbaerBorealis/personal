var buildings = [
    // {
    //     'name': '',
    //     'description': '',
    //     'symbol': '',
    //     'cost': 0,
    //     'maxInputs': 0,
    //     'maxOutputs': 0,
    //     'input': [],
    //     'processes': [],
    //     'output': []
    // }

    {
        'name': 'Base',
        'description': 'Accepts items for credits.',
        'symbol': 'B',
        'cost': 0,
        'maxInputs': 0,
        'maxOutputs': 0,
        'input': [],
        'processes': ['any'],
        'output': []
    },
    {
        'name': 'Logger',
        'description': 'Cuts logs from a forest.',
        'symbol': 'L',
        'cost': 10,
        'maxInputs': 1,
        'maxOutputs': 1,
        'input': ['forest'],
        'processes': [],
        'output': ['log']
    },
    {
        'name': 'Sawmill',
        'description': 'Cuts logs into lumber.',
        'symbol': 'S',
        'cost': 20,
        'maxInputs': 0,
        'maxOutputs': 1,
        'input': [],
        'processes': ['log'],
        'output': ['lumber']
    },
    {
        'name': 'Mine',
        'description': 'Pulls ores from a cave.',
        'symbol': 'M',
        'cost': 25,
        'maxInputs': 1,
        'maxOutputs': 1,
        'input': ['cave'],
        'processes': [],
        'output': ['ore']
    },
    {
        'name': 'Forge',
        'description': 'Smelts ore into metal',
        'symbol': 'F',
        'cost': 50,
        'maxInputs': 0,
        'maxOutputs': 1,
        'input': [],
        'processes': ['ore'],
        'output': ['metal']
    },
    {
        'name': 'Conveyor Belt',
        'description': 'Moves items',
        'symbol': 'C',
        'cost': 5,
        'maxInputs': 0,
        'maxOutputs': 1,
        'input': [],
        'processes': ['any'],
        'output': ['any']
    },
    {
        'name': 'Remove',
        'description': 'Click on the grid to remove a building.',
        'symbol': 'X',
        'cost': 'N/A',
        'maxInputs': 0,
        'maxOutputs': 0
    }
]