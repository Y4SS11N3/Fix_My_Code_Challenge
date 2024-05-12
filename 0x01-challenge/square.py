#!/usr/bin/python3
"""Defines a square class."""


class Square:
    """Represents a square."""

    def __init__(self, side_length):
        """Initializes a Square object."""
        self.side_length = side_length

    def area(self):
        """Calculates the area."""
        return self.side_length ** 2

    def perimeter(self):
        """Calculates the perimeter."""
        return 4 * self.side_length

    def __str__(self):
        """Returns string representation."""
        return f"Square with side length {self.side_length}"


if __name__ == "__main__":
    """Runs when directly executed."""
    s = Square(12)
    print(s)
    print(s.area())
    print(s.perimeter())
