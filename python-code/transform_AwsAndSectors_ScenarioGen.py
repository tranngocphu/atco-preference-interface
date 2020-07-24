""" The following code will generate a json file with waypoints, airways and sectors. The inputs to be given are region(lon,lat,...) 
    and the name of the file based on the region. the files will be saved based on this filename to the 'output path'

"""


import pandas as pd
import numpy as np
from pathlib import Path
import numpy as np
from classLib_yash import *
from shapely.geometry import Polygon, Point
from shapely.ops import transform
from functools import partial
import pyproj
from classLib_yash import *
import geopandas as gpd

output_path = 'E:/ATMRI/CD_R/ATCO_preferences_interface/Scenario_interface_work/python-code/'

def transformGenerateScenario(region,filename):
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

    import json
    with open(output_path+ str(filename)+'_Airways' +'.json', 'w') as json_file:
        json.dump(dict1, json_file)

    #second function starting, this is for sectors
    
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

    sectordict = {'Sectors':{
                    'sector1':{'type': 'secondary', 'boundary': l1[0]},
                    'sector2':{'type': 'secondary', 'boundary': l1[1]},
                    'sector3':{'type': 'secondary', 'boundary': l1[2]},
                    'sector4':{'type': 'secondary', 'boundary': l1[3]},
                    'sector5':{'type': 'secondary',  'boundary': l1[4]},
                    'sector6':{'type': 'primary', 'boundary':  l1[5]},
                    'sector7':{'type':'secondary', 'boundary': l1[6]},
                    'sector8':{'type':'secondary' ,'boundary':l1[7]}
                    }}

    sectorpoints=[sectordict]

    df= pd.read_json(output_path+ str(filename)+'_Airways' +'.json')
    datalist=[]
    for i in range(10):
        waypointList=[]
        for i in range(len(df)):
            for j in range(len(df.segments[i])):
                waypointList.append(WayPoint(df.segments[i][j]['name'],[df.segments[i][j]['transf_x'],900-df.segments[i][j]['transf_y']]))

        airwayList=[]
        a=0
        for i in range(len(df.segments)):
            x=len(df.segments[i])
            for j in range(a,len(waypointList[:a+x])-1):
                print('j: ',j)
                li= [waypointList[j],waypointList[j+1]]
                print(li)
                airwayList.append(Airways('aw'+str(j), li[0],li[1]))
            a+=x
        
        ac_per_scenario = 6
        aircraftList=[]
        aircraft_name=[]
        for n in range(1,ac_per_scenario+1):
            aircraft_name.append('ac'+str(n))
        for i in range(ac_per_scenario):
            point=np.random.choice(airwayList)
            d=[20,30,40,50,60,70,80,90,100,110,120,140,150,170,190,210,220,230,240,250] #offset,
            aircraft = Aircraft(str(aircraft_name[i]), point , np.random.choice(d))     #this randomization will create multiple scenaios
            aircraftList.append(aircraft)


        d= Scenario(waypointList,airwayList)
        dict4={}
        for i in range(len(waypointList)):
            waydict={waypointList[i].name:{
                'x':waypointList[i].x,
                'y':waypointList[i].y}}
            dict4.update(waydict)

        dict5={}
        for i in range(len(airwayList)):
            airwaydict= {airwayList[i].name:{
                'start':airwayList[i].start_wp,
                'end' : airwayList[i].end_wp}}
            dict5.update(airwaydict)


        dict6={}
        for i in range(len(aircraftList)):
            aircraftdict= {aircraftList[i].name:{
                'x':aircraftList[i].offset_x,
                'y':aircraftList[i].offset_y,
                'dir_x': aircraftList[i].dir_x,
                'dir_y': aircraftList[i].dir_y}}
            dict6.update(aircraftdict)    

        data_dict={'waypoints':dict4, 'airways':dict5,'aircrafts':dict6, 
            'sectors':{
                        'sector1':{'type': 'secondary', 'boundary': l1[0]},
                        'sector2':{'type': 'secondary', 'boundary': l1[1]},
                        'sector3':{'type': 'secondary', 'boundary': l1[2]},
                        'sector4':{'type': 'secondary', 'boundary': l1[3]},
                        'sector5':{'type': 'secondary',  'boundary': l1[4]},
                        'sector6':{'type': 'primary', 'boundary':  l1[5]},
                        'sector7':{'type':'secondary', 'boundary': l1[6]},
                        'sector8':{'type':'secondary' ,'boundary':l1[7]}
                        }}

        l=  ['sector1','sector2','sector3','sector4','sector5','sector6','sector7','sector8']
        for i in l:
            if primarySector == i:
                data_dict['sectors'][i]['type'] = 'primary'
            else:
                data_dict['sectors'][i]['type'] = 'secondary'

        datalist.append(data_dict)    

    with open(output_path+ str(filename)+'_Scenarios_withsectors' +'.json','w') as json_file2:
        json.dump(datalist, json_file2)

