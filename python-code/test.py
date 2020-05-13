import numpy as np 
import pandas as pd 
from classLib_yash import *
import random
import matplotlib.pyplot as plt




randompoints= [] # generating random point between 0 and 1
for i in range(1000): 
    a=[np.round(random.random(),4), np.round(random.random(),4)]
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
wpList = allWaypoint[:15] #need 15 waypoints

wpList=np.round(wpList,4)
print(wpList, len(wpList))
#####################################   waypoints   ###########################################
wpN = ['wpA','wpB','wpC','wpD','wpE','wpF','wpG','wpH','wpI', 'wpJ','wpK','wpL','wpM', 'wpN','wpO','wpP']
wpNameList=wpN[:len(wpList)]
#print(wpNames)
waypointList =[]
for i in range(len(wpList)):
    waypointList.append(WayPoint(wpNameList[i],wpList[i])) #list containing waypoint class elements
print("****")
print(waypointList[0].name)



  #list containing airways class elements
##################################    AIRWAYS  #####################################################

airwayList=[]
for i in range(8): #no of airways chosen 8 at random
    points = random.sample(waypointList,2)
    airwayList.append(Airways( points[0].name +' - '+ points[1].name, points[0], points[1]))
        
################################# AIRCRAFT ######################################

ac_per_scenario = 8  # just a random number to have no of aircraft in one scenario
aircraftList=[]
aircraft_name=np.arange(ac_per_scenario)
for i in range(ac_per_scenario):
    point = np.random.choice(airwayList) #point is an object of airway class, picking random instance of airway class list
    aircraft= Aircraft(aircraft_name[i],point)
    aircraftList.append(aircraft)

