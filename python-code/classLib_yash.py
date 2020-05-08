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

class Airways:
    def __init__(self, name, points):
        self.name=name
        self.start_wp= points[0][0]
        self.end_wp=points[1][0]
        self.start_wp_x= points[0][1][0]
        self.start_wp_y= points[0][1][1]
        self.end_wp_x= points[1][1][0]
        self.end_wp_y = points[1][1][1]
 
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
        
        """eqn- (y-y1)/(y2-y1) = (x-x1)/(x2-x1) --> y = ((y2-y1)/(x2-x1))*x - x1*((y2-y1)/(x2-x1)) +y1
                                                Y = MX +C
                                                so,Y(t) = M*X(t) +C, 
                                                        where x = X(t) and Y(t) = ((y2-y1)/(x2-x1))*X(t) - x1*((y2-y1)/(x2-x1)) +y1      
        """

    def location(self):
        self.xt_min = self.start_wp_x
        self.xt_max = self.end_wp_x
        self.slope = (self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)
        self.yt_min = self.xt_min*self.slope - self.start_wp_x*((self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)) + self.start_wp_y
        self.yt_max = self.xt_max*self.slope - self.start_wp_x*((self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)) + self.start_wp_y
        self.locations=[]
        for i in np.linspace(self.xt_min,self.xt_max,15):
            yt = np.round(i,2)*self.slope - self.start_wp_x*((self.end_wp_y - self.start_wp_y) / (self.end_wp_x - self.start_wp_x)) + self.start_wp_y
            self.locations.append([np.round(i,2),yt])

        return self.locations
    


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