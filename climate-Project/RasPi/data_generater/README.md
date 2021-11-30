# Random Data Generater

Generate random temperature and humidity data based on time.

## Usage:

```bash
chmod +x data_generator.py
```

Generating 1 hour 30 minutes data before now, output to data.csv file.

```bash
data_generator.py -h 1 -m 30 -f data.csv
```

## Or:

Import the file. Generate the last 3000 seconds data into "data" object.

```python
import data_generater.data_generater

data = data_generater.generate_data(3000)

print(data)
```
