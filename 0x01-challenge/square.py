#!/usr/bin/python3

class Square:

    def __init__(self, side_length):
        self.side_length = side_length

    def area_of_my_square(self):
        """ Area of the square """
        return self.side_length ** 2

    def perimeter_of_my_square(self):
        """ Perimeter of the square """
        return 4 * self.side_length

    def __str__(self):
        return "{0}".format(self.side_length)


if __name__ == "__main__":

    s = Square(side_length=12)
    print(s)
    print(s.area_of_my_square())
    print(s.perimeter_of_my_square())
