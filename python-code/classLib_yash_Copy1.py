import numpy as np
import matplotlib.pyplot as plt

class WayPoint:
    def __init__(self,name, point):
        """The waypoint object has a name, x co-rord and y co-ord"""
        self.name = name
        self.x=point[0]
        self.y=point[1]

    def __str__(self):
        return 'waypoint class:'+ self.name +'  x co-ord: '+ str(self.x) +'  y co-ord: '+str(self.y)

class Airways:
    def __init__(self, name, start, end):
        """here 'start' and 'end' are waypoint objects"""
        self.name=name
        self.start_wp = start.name
        self.end_wp = end.name
        self.start_wp_x = start.x
        self.start_wp_y = start.y
        self.end_wp_x = end.x
        self.end_wp_y = end.y
 
    def airwayStartLoc(self):
        self.start_x = self.start_wp_x
        self.start_y = self.start_wp_y
        return np.array([self.start_x,self.start_y])

    def airwayEndLoc(self):
        self.end_x = self.end_wp_x
        self.end_y = self.end_wp_y
        return np.array([self.end_x,self.end_y])

    def airwayCoefficient(self):
        try:
            self.slope = (self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)
        except ValueError:
            self.slope= np.NaN
        self.intercept = self.start_wp_y - self.start_wp_x*self.slope
        
        return self.slope, self.intercept
        
    #     """eqn- (y-y1)/(y2-y1) = (x-x1)/(x2-x1) --> y = ((y2-y1)/(x2-x1))*x - x1*((y2-y1)/(x2-x1)) +y1
    #                                             Y = MX +C
    #                                             so,Y(t) = M*X(t) +C, 
    #                                                     where x = X(t) and Y(t) = ((y2-y1)/(x2-x1))*X(t) - x1*((y2-y1)/(x2-x1)) +y1      
    #     """

    def location(self):
        self.xt_min = self.start_wp_x
        self.xt_max = self.end_wp_x
        self.slope = (self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)
        self.yt_min = self.xt_min*self.slope - self.start_wp_x*((self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)) + self.start_wp_y
        self.yt_max = self.xt_max*self.slope - self.start_wp_x*((self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)) + self.start_wp_y
        self.location=[]
        for i in np.linspace(self.xt_min,self.xt_max,15):
            yt = np.round(i,4)*self.slope - self.start_wp_x*((self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)) + self.start_wp_y
            self.location.append([np.round(i,4),np.round(yt,4)])

        return self.location
             
    def __str__(self):
        return self.start_wp +'start coords' + str(self.start_wp_x) + str(self.start_wp_y) +  self.end_wp
        # self.endPoint= self.end_wp_x, self.end_wp_y
        # return self.startPoint, self.endPoint

    

class Aircraft:
    def __init__(self, name, route):
        """here route is the airway object"""
        self.name = name
        self.route = route.name
        self.start_wp = route.start_wp
        self.end_wp = route.end_wp
        self.start_wp_x = route.start_wp_x
        self.start_wp_y = route.start_wp_y
        self.end_wp_x = route.end_wp_x
        self.end_wp_y = route.end_wp_y
        self.location = route.location

        # self.start = np.array([self.start_x,self.start_y])
        # self.end = np.array([self.end_x, self.end_y])
        # self.segment = np.linalg.norm(self.start - self.end)
        # self.dir_x = (self.end_x - self.start_x) / self.segment
        # self.dir_y = (self.end_y - self.start_y) / self.segment
    
