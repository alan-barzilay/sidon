import pandas as pd
df = pd.read_excel("cemetery_table.xlsx")
df = df.drop(["mother_family_name","mother_name","spouse_name","spouse_family_name","age","notes"],axis=1)
df["gender"] = df["gender"].map({"M":"♂", "F":"♀"})

df.to_json("cemetery_table.json",  orient = 'records')
