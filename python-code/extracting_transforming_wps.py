import numpy as np
import pandas as pd
from shapely.geometry import Polygon, Point
from shapely.ops import transform
from functools import partial
import pyproj

screen = 900 #900 X 900points


def filter_transformCoords(x1,y1,x2,y2,x3,y3,x4,y4, wpdataFrame):
    """For this kind of conversion, the shape should be a square or a rectangle.
    the sequence of x's and y's is from lower left corner , anticlockwise
    longitude corresponds to x direction and latitiude to y direction"""
    # project = partial(pyproj.transform,
    # pyproj.Proj(init='epsg:4326'),
    # pyproj.Proj('+proj=merc +a=6378137 +b=6378137 +lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null +no_defs'))
    
    inboundWps = pd.DataFrame()
    boundary_coordinates = ([x1,y1],[x2,y2],[x3,y3],[x4,y4])
    poly = Polygon(boundary_coordinates)
    for i in range(len(wpdataFrame)):
        point = Point([wpdataFrame.loc[i,'lat'],wpdataFrame.loc[i,'lon']])
        if poly.contains(point)== True:
            inboundWps=inboundWps.append(wpdataFrame.loc[i])

    inboundWps=inboundWps.reset_index()
    a_ = np.array([y1,x1])
    b_ = np.array([y2,x2])
    c_ = np.array([y3,x3])
    d_ = np.array([y4,x4])

    horizontal_len= b_[0]-a_[0]
    vertical_len = d_[1]-a_[1]

    transform_x = []
    transform_y =[]

    for i in range(len(inboundWps)):
    
        P = np.array([inboundWps.loc[i,'lon'], inboundWps.loc[i,'lat']])
        vert_d = np.linalg.norm(np.cross(b_-a_,a_-P))/np.linalg.norm(b_-a_)
        horiz_d = np.linalg.norm(np.cross(d_-a_,a_-P))/np.linalg.norm(d_-a_)
        new_horz = (900/horizontal_len)*horiz_d
        new_vert = (900/vertical_len)*vert_d
        transform_x.append(new_horz)
        transform_y.append(new_vert)
    transF_x=pd.Series(transform_x,name= 'transf_x')
    transF_y=pd.Series(transform_y,name= 'transf_y')
    print("done")
    new_df = pd.concat([inboundWps,transF_x,transF_y], axis=1)
    
    return new_df






# E:\ATMRI\CD_R\ATCO_preferences_interface\
df = pd.read_json('.\Scenario_interface_work\waypoints.json')

a=filter_transformCoords(1.19,103.06,1.19,104.7,1.76,104.7,1.76,103.06,df)
print(a)
