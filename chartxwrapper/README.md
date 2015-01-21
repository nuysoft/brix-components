# ChartxWrapper

> 封装了 [Chartx](http://groups.alidemo.cn/thx/charts/)。

<div class="bs-example">
    <div class="content">
        <div bx-name="components/chartxwrapper" 
            data-type="line"
            data-options="{}"
            data-data="[
                ['VAL1: ', 'VAL2: ', 'VAL3: ', 'VAL4: '],
                [1, 101, 20, 33],
                [2, 67, 51, 26],
                [3, 76, 45, 43],
                [4, 58, 35, 31],
                [5, 79, 73, 71],
                [6, 88, 54, 39],
                [7, 56, 68, 65],
                [8, 99, 83, 51]
            ]" style="width: 100%; height: 320px;"></div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chartxwrapper" 
                data-type="bar"
                data-options="{}"
                data-data="[
                    ['VAL1: ', 'VAL2: ', 'VAL3: ', 'VAL4: '],
                    [1, 101, 20, 33],
                    [2, 67, 51, 26],
                    [3, 76, 45, 43],
                    [4, 58, 35, 31],
                    [5, 79, 73, 71],
                    [6, 88, 54, 39],
                    [7, 56, 68, 65],
                    [8, 99, 83, 51]
                ]" style="width: 100%; height: 320px;"></div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chartxwrapper" 
                data-type="pie"
                data-options="{}"
                data-data="[
                    ['Opera', 1],
                    ['IE', 3],
                    ['Chrome', 5],
                    ['Firefox', 2],
                    ['Safari', 1]
                ]" style="width: 100%; height: 320px;"></div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chartxwrapper" 
                data-type="map"
                data-options="{}"
                data-data="[]" style="width: 100%; height: 320px;"></div>
        </div>
    </div>
</div>
<div class="bs-example">
    <div class="content">
        <div bx-name="components/chartxwrapper" data-type="force" style="width: 100%; height: 320px;">
            {
                "nodes": {
                    "a": {},
                    "c": {},
                    "b": {},
                    "e": {},
                    "d": {},
                    "g": {},
                    "i": {},
                    "h": {},
                    "k": {},
                    "n": {},
                    "w": {}
                },
                "edges": {
                    "a": {
                        "b": {
                            "weight": 0.2
                        },
                        "e": {
                            "weight": 0.7
                        },
                        "w": {
                            "weight": 0.9
                        },
                        "n": {
                            "weight": 0.7
                        }
                    },
                    "c": {
                        "b": {
                            "weight": 0.5
                        },
                        "d": {
                            "weight": 0.9
                        }
                    },
                    "b": {
                        "a": {
                            "weight": 0.2
                        },
                        "c": {
                            "weight": 0.9
                        },
                        "i": {
                            "weight": 0.7
                        },
                        "h": {
                            "weight": 0.8
                        },
                        "k": {
                            "weight": 0.1
                        },
                        "n": {
                            "weight": 0.2
                        }
                    },
                    "e": {
                        "a": {
                            "weight": 0.3
                        },
                        "k": {
                            "weight": 0.2
                        },
                        "d": {
                            "weight": 0.9
                        }
                    },
                    "d": {
                        "c": {
                            "weight": 0.9
                        },
                        "e": {
                            "weight": 0.9
                        },
                        "n": {
                            "weight": 0.1
                        }
                    },
                    "g": {
                        "i": {
                            "weight": 0.2
                        },
                        "h": {
                            "weight": 0.9
                        }
                    },
                    "i": {
                        "k": {
                            "weight": 0.2
                        },
                        "b": {
                            "weight": 0.2
                        },
                        "w": {
                            "weight": 0.7
                        },
                        "g": {
                            "weight": 0.9
                        }
                    },
                    "h": {
                        "g": {
                            "weight": 0.9
                        }
                    },
                    "k": {
                        "i": {
                            "weight": 0.3
                        },
                        "e": {
                            "weight": 0.2
                        }
                    },
                    "n": {
                        "w": {
                            "weight": 0.1
                        }
                    },
                    "w": {
                        "i": {
                            "weight": 0.4
                        },
                        "a": {
                            "weight": 0.1
                        },
                        "n": {
                            "weight": 0.8
                        }
                    }
                },
                "_": ""
            }
        </div>
        </div>
    </div>
</div>

<div class="bs-example">
    <div class="content">
        <div bx-name="components/chartxwrapper" data-type="line" style="width: 480px; height: 320px;">
            [
                ['VAL1: ', 'VAL2: ', 'VAL3: ', 'VAL4: '],
                [1, 101, 20, 33],
                [2, 67, 51, 26],
                [3, 76, 45, 43],
                [4, 58, 35, 31],
                [5, 79, 73, 71],
                [6, 88, 54, 39],
                [7, 56, 68, 65],
                [8, 99, 83, 51]
            ]
        </div>
    </div>
</div>
