from PIL import Image
import math

# Northwest Minecraft coordinates of the blueprint
top_left_x   = -400
top_left_y   = -400 # NOTE: Minecraft is weird and North is negative Z, not positive
# Total size of the blueprint
total_width  =  800
total_height =  800
# Minecraft coordinates of the center of the spiral
origin_x     =    0
origin_y     =    0
# Whether the design is centered on a pixel or the line between pixels (not implemented)
is_even      = False
# Whether the spiral starts going north, south, east, or west
initial_dir  = "south"
# How much the spiral should expand per full rotation
increase     = 64
# the radius at which the spiral should actually begin
start_dist   = 32
# the direction the spiral turns as it goes outwards
clockwise    = False
# the colors for the different parts of the blueprint
bckgrnd_clr  = (255, 255, 255) # white
grid_clr_1   = (255, 204, 204) # light-red
grid_clr_2   = (204, 217, 255) # light-blue
spiral_clr   = (  0,   0,   0) # black
test_clr     = (255,   0,   0) # red

file_name    = "spiral.png"
pi           = math.pi

def main():
    spiral_img = Image.new('RGB', (total_width, total_height), color = bckgrnd_clr)
    for x in range(total_width):
        for y in range(total_height):
            # calculate the Minecraft coordinates of the pixel
            map_x = top_left_x + x
            map_y = top_left_y + y
            # calculate the x/y difference from the origin
            #     (will not change if the origin is at 0,0)
            x_diff = map_x - origin_x
            y_diff = map_y - origin_y
            # calculate how far the pixel is from the origin
            radius = round(math.sqrt(x_diff ** 2 + y_diff ** 2))
            
            # get additional spiral info
            octant = getOctant(x_diff, y_diff)
            full_angle = getFullAngle(octant, x_diff, y_diff)
            
            radius_increase = radius
            while radius_increase > increase:
                radius_increase -= increase
            
            # calculate how far the radius should have expanded given the current angle
            expected_increase = round(full_angle / (2 * pi) * increase)
            
            # ignore if it is inside the start radius
            if radius >= start_dist and radius_increase == expected_increase:
                spiral_img.putpixel((x, y), spiral_clr)
            elif radius < start_dist and radius_increase == expected_increase:
                spiral_img.putpixel((x, y), test_clr)
            # draw the grid behind the spiral
            elif map_x % 16 == 0 or map_x % 16 == 15 or map_y % 16 == 15 or map_y % 16 == 0:
                drawGrid(x, y, spiral_img)
    
    spiral_img.save(file_name)
    print('Process complete.')
# END main()

def getOctant(x_diff, y_diff):
    #   8 1
    # 7     2
    # 6     3
    #   5 4
    # I'm not sure if I use the octant anywhere. This might get changed to quadrants
    if(x_diff < 0):
        if(y_diff < 0):
            if(x_diff < y_diff):
                octant = 7
            else:
                octant = 8
        else:
            if(-1 * x_diff < y_diff):
                octant = 5
            else:
                octant = 6
    else: # x_diff >= 0
        if(y_diff < 0):
            if(x_diff < y_diff * -1):
                octant = 2
            else:
                octant = 1
        else:
            if(x_diff < y_diff):
                octant = 4
            else:
                octant = 3
    return octant
# END getOctant()

def getFullAngle(octant, x_diff, y_diff):
    # needs global variable initial_dir
    full_angle = 0
    
    # Can't explain this either, but it was initially 0-3 for NESW
    #     It didn't work as expected, so I just altered which settings
    #     gave which initial_dir to fit the results...
    if (clockwise and initial_dir == "north") or (not(clockwise) and initial_dir == "east"):
        dir_num = 0
    elif (clockwise and initial_dir == "west") or (not(clockwise) and initial_dir == "south"):
        dir_num = 1
    elif (clockwise and initial_dir == "south") or (not(clockwise) and initial_dir == "west"):
        dir_num = 2
    elif (clockwise and initial_dir == "east") or (not(clockwise) and initial_dir == "north"):
        dir_num = 3
    else: # should never happen
        dir_num = -1
    
    # Not really sure how to explain this... it's just a weird formula
    #     I made that counts how many quarters the spiral has turned
    #     from the start direction
    if clockwise:
        #quarter_count = abs(dir_num - math.floor((octant - 1) / 2))
        quarter_count = (dir_num + math.floor((octant - 1) / 2)) % 4
    else:
        quarter_count = (dir_num - math.floor((octant - 1) / 2)) % 4
    
    full_angle += (quarter_count / 2 * pi)
    
    clockwise_factor = 1
    if not(clockwise):
        clockwise_factor = -1
        
    if x_diff * y_diff * clockwise_factor < 0:
        # use x/y
        full_angle += math.atan(abs(x_diff / y_diff))
    elif x_diff * y_diff * clockwise_factor > 0:
        # use y/x
        full_angle += math.atan(abs(y_diff / x_diff))
    #else:
        # is 0. Ignore?
    
    return full_angle
# END getFullAngle(quadrant, diff, y_diff)

def drawGrid(x, y, img):
    map_x = top_left_x + x
    map_y = top_left_y + y
    if map_x * map_y >= 0:
        if (map_y == 0 and map_x < 0) or (map_x == 0 and map_y < 0):
            img.putpixel((x, y), grid_clr_2)
        else:
            img.putpixel((x, y), grid_clr_1)
    else:
        img.putpixel((x, y), grid_clr_2)
# END drawGrid(x, y, img)
    
main()