#!/usr/bin/python3
""" 
User class
"""

class User():
    """ Class to represent a User """

    def __init__(self):
        """ Initialize with email as None """
        self.__email = None

    @property
    def email(self):
        """ Getter for email """
        return self.__email

    @email.setter
    def email(self, value):
        """ Setter for email, checks if value is a string """
        if not isinstance(value, str):
            raise TypeError("Email must be a string")
        self.__email = value

if __name__ == "__main__":
    "Execute main block."
    u = User()
    u.email = "john@snow.com"
    print(u.email)
