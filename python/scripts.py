import docx2txt
result = docx2txt.process("../uploads/uploaded.docx")

print(result)
sys.stdout.flush()