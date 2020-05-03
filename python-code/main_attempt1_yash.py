import numpy as np 
import pandas as pd 
from classLib import *
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
    if all(i>0.2 for i in a):
        allWaypoint.append(randompoints[j])
print('no of waypoints:', len(allWaypoint))
waypointList = allWaypoint[:15] #need 15 waypoints
print(waypointList)
print('length of waypoint list:',len(waypointList))
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


##################################    AIRWAYS  #####################################################
# Here, airway is a subclass of wayPoint class and every 
wayPointInfo=[]
for i in range(len(wpNameList)):
    wayPointInfo.append([wpNameList[i],waypointList[i]])

airwayNames=np.arange(len(wpNameList))
airway_list=[]
for i in range(len(waypointList)-2):
    airway_list.append(airways(airwayNames[i],random.sample(wayPointInfo,2)))  #list containing airways class elements

################################# AIRCRAFT ######################################

ac_names = np.arange(10)
ac_info=[]
for i in range(len(ac_names)):
    ac_info.append(aircraft(ac_names[i],random.sample(wayPointInfo,2)))