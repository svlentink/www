#!/usr/bin/env python3


def get_chars(specialchar=chr(37)):
  '''
  The array it returns contains alphanumeric chars,
  all 10 + 26*2 = 62
  However for binary we think 64 is more useful.
  We therefor add one special character
  (which is sometimes mandatory for passwords)
  and also 
  '''
  arr = []
  # add integers
  for i in range(48,58):
    arr.append(chr(i))
  for i in [65,97]: # upper and lowercase
    for j in range(i,i+26):
      arr.append(chr(j))
  arr.append(specialchar)
  arr.append('')
  return arr

arr = get_chars()
print(len(arr))



