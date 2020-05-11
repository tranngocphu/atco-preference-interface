import numpy as np 
import pandas as pd 
from classLib_yash import *
import random
import matplotlib.pyplot as plt



randompoints= [] # generating random point between 0 and 1
for i in range(1000): 
    a=[random.random(), random.random()]
    randompoints.append(a)
print('length of random points:',len(randompoints))
allWaypoint = [] #here selecting the points which have a distance of more than 0.2 from every other (no justification as to why 0.2)
for j in range(len(randompoints)):
    a=[]
    for k in range(j+1,len(randompoints)):
        s=np.linalg.norm(np.array(randompoints[j])-np.array(randompoints[k])) # not efficient way to claculate distance of one point from all others
        a.append(s)
    if all(i>0.15 for i in a):
        allWaypoint.append(randompoints[j])
print('no of waypoints:', len(allWaypoint))
waypointList = allWaypoint[:15] #need 15 waypoints
print(waypointList)
print(len(waypointList))
print("^^^")
print()
# for i in range(len(waypointList)):
#     plt.scatter(waypointList[i][0],waypointList[i][1])
# plt.show()

wpN = ['wpA','wpB','wpC','wpD','wpE','wpF','wpG','wpH','wpI', 'wpJ','wpK','wpL','wpM', 'wpN','wpO','wpP']
wpNameList=wpN[:len(waypointList)]
#print(wpNames)
wps =[]
for i in range(len(waypointList)):
    wps.append(wayPoint(wpNameList[i],waypointList[i])) #list containing waypoint class elements
# print("****")
# print(wps[0].name)



  #list containing airways class elements
##################################    AIRWAYS  #####################################################
# Here, airway is a subclass of wayPoint class and every 
wayPointInfo=[]
for i in range(len(wpNameList)):
    wayPointInfo.append([wpNameList[i],waypointList[i]])

airwayNames=np.arange(len(wpNameList))
airwayList=[]
sampled_airways=[]
for i in range(len(waypointList)-2):
    points = random.sample(wayPointInfo,2)
    airwayList.append(Airways(airwayNames[i],points))
    sampled_airways.append(points)
        
################################# AIRCRAFT ######################################

ac_per_scenario =8  # just a random number to have no of aircraft in one scenario
aircraftList=[]
aircraft_name=np.arange(ac_per_scenario)
for i in range(ac_per_scenario):
    aircraft= Aircraft(aircraft_name[i],random.choice(sampled_airways))
    aircraftList.append(aircraft)


class Scenario:
    def __init__(self, way)
