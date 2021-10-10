import textract
import sys

text = textract.process(sys.argv[1])
return text