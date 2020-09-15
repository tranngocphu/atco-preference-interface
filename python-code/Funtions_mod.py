"""This file contains funtions used in generating scenarios"""

import pandas as pd
import numpy as np
from pathlib import Path
import numpy as np
from classLib_yash import *
from shapely.geometry import Polygon, Point
from shapely.ops import transform
from functools import partial
import pyproj
import geopandas as gpd


"""this function takes the airway file in and transforms it to add x, y locations of each waypoint in the file
    The input is the region (format - (lon,lat,lon,lat...)) on the basis of which, we want to transform the co-ordinates.
    It returns a dictionary.
"""


def airwayTransofrmation_xy(region):
    a = np.array([region[0],region[1]])
    b = np.array([region[2],region[3]])
    c = np.array([region[4],region[5]])
    d = np.array([region[6],region[7]])

    airway = pd.read_json('e:/ATMRI/CD_R/ATCO_preferences_interface/Scenario_interface_work/airways.json')

    filteraws = airway #reassigned just for easy of duplicating from the original snippets (testingTheNeedOfFilteringAirways.ipynb)
    
    horizontal_len = b[0]- a[0]
    vertical_len   = d[1] - a[1]

    dict1=[]

    for i in range(len(filteraws)):
        d1= []
        for j in range(len(filteraws.segments[i])):
            # print(j)
            P = np.array([float(filteraws.segments[i][j]['lon']),float(filteraws.segments[i][j]['lat'])])
            vert_d = P[1]-a[1]
            horiz_d = P[0] -a[0]
            airdict1={
                "name":filteraws.segments[i][j]['name'],
                "lat":filteraws.segments[i][j]['lat'],
                "lon":filteraws.segments[i][j]['lon'],
                "latdms":filteraws.segments[i][j]['latdms'],
                "londms":filteraws.segments[i][j]['londms'],
                "transf_x": (900/horizontal_len)*horiz_d,
                "transf_y": (900/vertical_len)*vert_d
                }
            d1.append(airdict1)
        dict3 ={"name":filteraws.name[i], 
            "segments":d1}
        dict1.append(dict3)

    return dict1


"""The following function takes the geopy file of sector boundaries and converts them to a dictionary"""
def sectorTransformation(region):

    a = np.array([region[0],region[1]])
    b = np.array([region[2],region[3]])
    c = np.array([region[4],region[5]])
    d = np.array([region[6],region[7]])
    
    horizontal_len = b[0]- a[0]
    vertical_len   = d[1] - a[1]
   
    df2=pd.read_json('SgSectors_LonLat.json')

    keylist=['sector1','sector2','sector3','sector4','sector5','sector6','sector7','sector8']
    l1=[[],[],[],[],[],[],[],[]]
    for i in range(len(keylist)):
        for j in range(len(df2.Sectors[0][keylist[i]])):
            P= np.array([df2.Sectors[0][keylist[i]][j][0],df2.Sectors[0][keylist[i]][j][1]])
            # print(P)
            vert_d = P[1]-a[1]
            horiz_d= P[0]-a[0]
            l1[i].append([(900/horizontal_len)*horiz_d,900-(900/vertical_len)*vert_d])

    sectordict= {'Sectors':{
                    'sector1':{'type': 'secondary', 'boundary': l1[0]},
                    'sector2':{'type': 'secondary', 'boundary': l1[1]},
                    'sector3':{'type': 'secondary', 'boundary': l1[2]},
                    'sector4':{'type': 'secondary', 'boundary': l1[3]},
                    'sector5':{'type': 'secondary',  'boundary': l1[4]},
                    'sector6':{'type': 'primary', 'boundary':  l1[5]},
                    'sector7':{'type':'secondary', 'boundary': l1[6]},
                    'sector8':{'type':'secondary' ,'boundary':l1[7]}
                    }}
    return sectordict