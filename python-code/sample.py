"""creating classes for waypoints, airways and aircraft.
    These classes only have data attributes for the moment"""
import numpy as np

class wayPoint:
    def __init__(self, name, point):
        self.name = name
        self.x=point[0]
        self.y=point[1]
		self.airways = []		
        # can i define functions here itself, so that i randomly input some number, and this class and this function will check and
        # return a group of waypoints
    
	def update_location(self, new_loc):
		self.x = new_loc[0]
		self.y = new_loc[1]

	def change_name(self, new_name):
		self.name = new_name

	def distance_to(self, wp):
		d = (self.x - wp.x)**2 + ...

	def add_airways(self, aw_names):
		self.airways += aw_names

	
	
	def __str__(self):
        return 'waypoint class:'+ self.name +'  x co-ord: '+ str(self.x) +'  y co-ord: '+str(self.y)

class airways:
    def __init__(self, name, start, end):
		"""
			Arguments:
				name - string: name of this aw
				start - string: name of first wp
				end - string: name of second wp
		"""
        self.name = name
		self.start = start # string
		self.end = end  # string		
		self.compute_coeficients(start, end)
		
        	
	
	def start_loc(self, wp_list):
		locx = wp_list[self.start].x
		locy = wp_list[self.start].y
		return np.array([locx, locy])


	def end_loc(self, wp_list):
		locx = wp_list[self.start].x
		locy = wp_list[self.start].y
		return np.array([locx, locy])


	def compute_coeficients(self, start, end):
		"""
			This method computes the parametric equation of this aw
			Arguments: start and end of this aw segment
			Returns:
				coef1, coef2.. of 2 equations x=x(t), y=y(t)
				min_t, max_t
		""" 
		# computation goes here to find a b c d and min_t max_t
		self.min_t = None
		self.max_t = None
		# self.xfunc = a*t + b
		# self.yfunc = c*t + d
		self.a = None
		self.b = None
		self.c = None
		self.d = None
		return

	
	def get_loc_from_t(self, t):
		if (t < min_t or t > max_t):
			raise ValueError("")
		x = self.a * t + self.b
		y = self.c * t + self.d
		return np.array([x,y])



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


class Scenario:
	def __init__(self, n):
		self.num_of_wp = n
		# randomize n names
		names = []
		# randomize n points of 2D array
		points = [] 
		# collect information for the construction of WPs and AWs

		self.waypoints = { wp_name : wayPoint(names[i], points[i]) for i in range(0,n), wp_name in names }



if __name__ == "__main__":
	
	wp1.add_airways(['awname1'])
	wp2.add_airways(['awname1'])
	aw1.start = wp1.name
	aw1.end   = wp2.name

	aw1_start_loc = aw1.start_loc(wp_list)  # return 2D np array


	{
		"wp_name1" : objectofwp1,
		"wp_name2" : objectofwp2,
	}
	