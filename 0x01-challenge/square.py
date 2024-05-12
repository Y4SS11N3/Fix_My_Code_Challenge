#!/usr/bin/python3

class Square:
    def __init__(self, side=0):
        self.side = side

    def area_of_my_square(self):
        """ Area of the square """
        return self.side * self.side

    def perimeter_of_my_square(self):
        return 4 * self.side

    def __str__(self):
        return "Square(side={})".format(self.side)


if __name__ == "__main__":
    s = Square(side=12)
    print(s)
    print("Area:", s.area_of_my_square())
    print("Perimeter:", s.perimeter_of_my_square())
