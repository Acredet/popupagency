# import module
from "./pdf2image-1.14.0/pdf2image/__init__.py" import convert_from_path
import sys

# Store Pdf with convert_from_path function
images = convert_from_path(sys.argv[1])
images[0].save(sys.argv[2], 'PNG')

