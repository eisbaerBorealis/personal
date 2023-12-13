const COLOR_OUTER_WALLS = '#006100';
const COLOR_INNER_WALLS = '#7FBF7F';
const COLOR_RACKS = '#019595';

var buildings = [
    {
        'name' : 'SUS1',
        'length' : 708,
        'width' : 180,
        'parts' : {
            'outerWalls' : [
                0, 0,
                708, 0,
                708, 180,
                0, 180,
                0, 0
            ],
            'innerWalls' : [
                [170, 0,
                 170, 19,
                 390, 19,
                 390, 0],
                [142, 180,
                 142, 140,
                 220, 140,
                 220, 40,
                 345, 40,
                 345, 150,
                 412, 150,
                 412, 135,
                 454, 135,
                 454, 120,
                 708, 120]
            ],
            'racking' : {
                'width' : 4.1,
                'depth' : 4,
                'direction' : 'vertical',
                'aisles' : [
                    {
                        'name' : 'D16',
                        'startX' : 16,
                        'startY' : 40.2,
                        'binCount' : 30,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D15',
                        'startX' : 20,
                        'startY' : 40.2,
                        'binCount' : 30,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D14',
                        'startX' : 35,
                        'startY' : 32,
                        'binCount' : 32,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D13',
                        'startX' : 39,
                        'startY' : 32,
                        'binCount' : 32,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D12',
                        'startX' : 54,
                        'startY' : 32,
                        'binCount' : 32,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D11',
                        'startX' : 58,
                        'startY' : 32,
                        'binCount' : 32,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D10',
                        'startX' : 73,
                        'startY' : 32,
                        'binCount' : 32,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D09',
                        'startX' : 77,
                        'startY' : 32,
                        'binCount' : 32,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D08',
                        'startX' : 92,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D07',
                        'startX' : 96,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D06',
                        'startX' : 111,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D05',
                        'startX' : 115,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D04',
                        'startX' : 130,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D03',
                        'startX' : 134,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D02',
                        'startX' : 149,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'D01',
                        'startX' : 153,
                        'startY' : 32,
                        'binCount' : 22,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C22',
                        'startX' : 412,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C21',
                        'startX' : 416,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C20',
                        'startX' : 431,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C19',
                        'startX' : 435,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C18',
                        'startX' : 450,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C17',
                        'startX' : 454,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C16',
                        'startX' : 469,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C15',
                        'startX' : 473,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C14',
                        'startX' : 488,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C13',
                        'startX' : 492,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C12',
                        'startX' : 507,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C11',
                        'startX' : 511,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C10',
                        'startX' : 526,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C09',
                        'startX' : 530,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C08',
                        'startX' : 545,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C07',
                        'startX' : 549,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C06',
                        'startX' : 564,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C05',
                        'startX' : 568,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C04',
                        'startX' : 583,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C03',
                        'startX' : 587,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C02',
                        'startX' : 602,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                    {
                        'name' : 'C01',
                        'startX' : 606,
                        'startY' : 32,
                        'binCount' : 18,
                        'levelCount' : 4
                    },
                ]
            },
            'otherAreas' : [

            ],
            'zones' : [

            ]
        }
    },
    {
        'name' : 'SUS2',
        'length' : 756,
        'width' : 180,
        'parts' : {
            'outerWalls' : [
                0, 47,
                47, 0,
                756, 0,
                756, 180,
                0, 180,
                0, 47
            ],
            'innerWalls' : [
                
            ],
            'racking' : {
                'width' : 4.1,
                'depth' : 4,
                'direction' : 'vertical',
                'aisles' : [
                    {
                        'name' : '2C36',
                        'startX' : 233,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C35',
                        'startX' : 237,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C34',
                        'startX' : 250,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C33',
                        'startX' : 254,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    
                    {
                        'name' : '2C32',
                        'startX' : 267,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C31',
                        'startX' : 271,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C30',
                        'startX' : 284,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C29',
                        'startX' : 288,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C28',
                        'startX' : 301,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C27',
                        'startX' : 305,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C26',
                        'startX' : 318,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C25',
                        'startX' : 322,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C24',
                        'startX' : 335,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C23',
                        'startX' : 339,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C22',
                        'startX' : 352,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C21',
                        'startX' : 356,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C20',
                        'startX' : 369,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C19',
                        'startX' : 373,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C18',
                        'startX' : 386,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C17',
                        'startX' : 390,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C16',
                        'startX' : 403,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C15',
                        'startX' : 407,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C14',
                        'startX' : 420,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C13',
                        'startX' : 424,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C12',
                        'startX' : 437,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C11',
                        'startX' : 441,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C10',
                        'startX' : 454,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C09',
                        'startX' : 458,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C08',
                        'startX' : 471,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C07',
                        'startX' : 475,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C06',
                        'startX' : 488,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C05',
                        'startX' : 492,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C04',
                        'startX' : 505,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C03',
                        'startX' : 509,
                        'startY' : 20,
                        'binCount' : 32,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C02',
                        'startX' : 522,
                        'startY' : 28.2,
                        'binCount' : 30,
                        'levelCount' : 5
                    },
                    {
                        'name' : '2C01',
                        'startX' : 526,
                        'startY' : 28.2,
                        'binCount' : 30,
                        'levelCount' : 5
                    },
                ]
            },
            'other-areas' : [

            ],
            'zones' : [

            ]
        }
    }
];

/*
    {
        'name' : 'SUS1',
        'length' : 708,
        'width' : 180,
        'parts' : {
            'outer-walls' : [

            ],
            'inner-walls' : [

            ],
            'racking' : {
                'width' : 4.1,
                'depth' : 4,
                'direction' : 'vertical',
                'aisles' : [
                    {
                        'name' : 'D01',
                        'startX' : 50,
                        'startY' : 50,
                        'binCount' : 22,
                        'levelCount' : 4
                    }
                ]
            },
            'other-areas' : [

            ],
            'zones' : [

            ]
        }
    }
*/