"""creating classes for waypoints, airways and aircraft.
    These classes only have data attributes for the moment"""
import numpy as np

class wayPoint:
    def __init__(self,name, point):
        self.name = name
        self.x=point[0]
        self.y=point[1]
        # can i define functions here itself, so that i randomly input some number, and this class and this function will check and
        # return a group of waypoints
    def __str__(self):
        return 'waypoint class:'+ self.name +'  x co-ord: '+ str(self.x) +'  y co-ord: '+str(self.y)

class airways:
    def __init__(self, name, points):
        self.name=name
        self.start_wp= points[0][0]
        self.end_wp=points[1][0]
        self.start_wp_x= points[0][1][0]
        self.start_wp_y= points[0][1][1]
        self.end_wp_x= points[1][1][0]
        self.end_wp_y = points[1][1][1]
    def __str__(self):
        return 'airway name :'+  str(self.name) +' start point: '+  str(self.start_wp)+' end point: '+  str(self.end_wp)
    


class aircraft:
    def __init__(self, name, points):
        self.name= name 
        self.start_x= points[0][1][0]
        self.start_y= points[0][1][1]
        self.end_x= points[1][1][0]
        self.end_y = points[1][1][1]
        self.start = np.array([self.start_x,self.start_y])
        self.end = np.array([self.end_x, self.end_y])
        self.segment = np.linalg.norm(self.start - self.end)
        self.dir_x = (self.end_x - self.start_x) / self.segment
        self.dir_y = (self.end_y - self.start_y) / self.segment