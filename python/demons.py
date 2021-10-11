import sys

with open('demonwords.txt') as f:
  lines = f.readlines()

  for i in range (len(lines)):
    lines[i] = lines[i][:len(lines[i]) - 1]

  print(lines)
  sys.stdout.flush()