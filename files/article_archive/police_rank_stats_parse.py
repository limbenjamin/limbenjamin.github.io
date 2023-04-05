from pypdf import PdfReader

def has_numbers(inputString):
	return any(char.isdigit() for char in inputString)

reader = PdfReader("police_rank_stats.pdf")

ranks = {"SGT 1 (V) - Trainee": 0, "Acting Insp (V)": 0, "Hon ASP (V)": 0, "Hon INSP (V)": 0, "Hon DSP (V)": 0, "Trainee SC": 0, "CW 2": 0, "SSI 2": 0, "SSI (P)": 0, "SI (P)": 0, "SSSGT (P)": 0, "SSGT (P)": 0, "SGT (P)": 0, "SI (V)": 0, "SC (V)": 0, "SSGT (V)": 0, "ASP (V)": 0, "INSP (V)": 0, "DSP (V)": 0, "SUPT (V)": 0, "CPL (V)": 0, "DAC (V)": 0, "SGT3": 0, "SGT1": 0, "SGT2": 0, "SUPT 1A": 0, "MX 13 (I)": 0, "MX14": 0, "MX 12": 0, "MX 11": 0, "SGT 3 (V)": 0, "SSI 2 (P)": 0, "SGT 2 (V)": 0, "SGT 1 (V)": 0, "SSI 2 (V)": 0}

names = []

for page in reader.pages:
	text = page.extract_text()
	lines = text.split("\n")
	for line in lines:
		words = line.split(" ")

		if "SGT 1 (V) - Trainee" in line:
			ranks["SGT 1 (V) - Trainee"] = ranks["SGT 1 (V) - Trainee"] + 1
			name = line.replace("SGT 1 (V) - Trainee","")
		elif "Acting Insp (V)" in line:
			ranks["Acting Insp (V)"] = ranks["Acting Insp (V)"] + 1
			name = line.replace("Acting Insp (V)","")
		elif "Hon ASP (V)" in line:
			ranks["Hon ASP (V)"] = ranks["Hon ASP (V)"] + 1
			name = line.replace("Hon ASP (V)","")
		elif "Hon ASP(V)" in line:
			ranks["Hon ASP (V)"] = ranks["Hon ASP (V)"] + 1
			name = line.replace("Hon ASP(V)","")
		elif "Hon INSP (V)" in line:
			ranks["Hon INSP (V)"] = ranks["Hon INSP (V)"] + 1
			name = line.replace("Hon INSP (V)","")
		elif "Hon DSP (V)" in line:
			ranks["Hon DSP (V)"] = ranks["Hon DSP (V)"] + 1
			name = line.replace("Hon DSP (V)","")
		elif "Trainee SC" in line:
			ranks["Trainee SC"] = ranks["Trainee SC"] + 1
			name = line.replace("Trainee SC","")
		elif "CW 2" in line:
			ranks["CW 2"] = ranks["CW 2"] + 1
			name = line.replace("CW 2","")
		elif "SSI 2 (V)" in line:
			ranks["SSI 2 (V)"] = ranks["SSI 2 (V)"] + 1
			name = line.replace("SSI 2 (V)","")
		elif "SSI 2 (P)" in line:
			ranks["SSI 2 (P)"] = ranks["SSI 2 (P)"] + 1
			name = line.replace("SSI 2 (P)","")
		elif "SSI 2" in line:
			ranks["SSI 2"] = ranks["SSI 2"] + 1
			name = line.replace("SSI 2","")
		elif "SSI (P)" in line:
			ranks["SSI (P)"] = ranks["SSI (P)"] + 1
			name = line.replace("SSI (P)","")
		elif "SI (P)" in line:
			ranks["SI (P)"] = ranks["SI (P)"] + 1
			name = line.replace("SI (P)","")  		    		
		elif "SI (V)" in line:
			ranks["SI (V)"] = ranks["SI (V)"] + 1
			name = line.replace("SI (V)","")  	
		elif "SC (V)" in line:
			ranks["SC (V)"] = ranks["SC (V)"] + 1
			name = line.replace("SC (V)","") 
		elif "SSSGT (P)" in line:
			ranks["SSSGT (P)"] = ranks["SSSGT (P)"] + 1 
			name = line.replace("SSSGT (P)","") 	
		elif "SSGT (P)" in line:
			ranks["SSGT (P)"] = ranks["SSGT (P)"] + 1
			name = line.replace("SSGT (P)","")  	
		elif "SSGT (V)" in line:
			ranks["SSGT (V)"] = ranks["SSGT (V)"] + 1
			name = line.replace("SSGT (V)","")  	
		elif "ASP (V)" in line:
			ranks["ASP (V)"] = ranks["ASP (V)"] + 1 
			name = line.replace("ASP (V)","") 
		elif "SGT (P)" in line:
			ranks["SGT (P)"] = ranks["SGT (P)"] + 1 
			name = line.replace("SGT (P)","") 	
		elif "INSP (V)" in line:
			ranks["INSP (V)"] = ranks["INSP (V)"] + 1 
			name = line.replace("INSP (V)","") 
		elif "DSP (V)" in line:
			ranks["DSP (V)"] = ranks["DSP (V)"] + 1
			name = line.replace("DSP (V)","")  
		elif "SUPT (V)" in line:
			ranks["SUPT (V)"] = ranks["SUPT (V)"] + 1 
			name = line.replace("SUPT (V)","") 
		elif "CPL (V)" in line:
			ranks["CPL (V)"] = ranks["CPL (V)"] + 1
			name = line.replace("CPL (V)","")  
		elif "DAC (V)" in line:
			ranks["DAC (V)"] = ranks["DAC (V)"] + 1 
			name = line.replace("DAC (V)","")  
		elif "SGT 3 (V)" in line:
			ranks["SGT 3 (V)"] = ranks["SGT 3 (V)"] + 1
			name = line.replace("SGT 3 (V)","")   
		elif "SGT 3" in line:
			ranks["SGT3"] = ranks["SGT3"] + 1   
			name = line.replace("SGT 3","")
		elif "SGT 1 (V)" in line:
			ranks["SGT 1 (V)"] = ranks["SGT 1 (V)"] + 1
			name = line.replace("SGT 1 (V)","")   
		elif "SGT 1" in line:
			ranks["SGT1"] = ranks["SGT1"] + 1   
			name = line.replace("SGT 1","")
		elif "SGT 2 (V)" in line:
			ranks["SGT 2 (V)"] = ranks["SGT 2 (V)"] + 1
			name = line.replace("SGT 2 (V)","")   
		elif "SGT 2" in line:
			ranks["SGT2"] = ranks["SGT2"] + 1   
			name = line.replace("SGT 2","")
		elif "SUPT 1A" in line:
			ranks["SUPT 1A"] = ranks["SUPT 1A"] + 1  
			name = line.replace("SUPT 1A","") 
		elif "MX 13 (I)" in line:
			ranks["MX 13 (I)"] = ranks["MX 13 (I)"] + 1 
			name = line.replace("MX 13 (I)","")  
		elif "MX 14" in line:
			ranks["MX14"] = ranks["MX14"] + 1   
			name = line.replace("MX 14","")
		elif "MX 12" in line:
			ranks["MX 12"] = ranks["MX 12"] + 1 
			name = line.replace("MX 12","")
		elif "MX 11" in line:
			ranks["MX 11"] = ranks["MX 11"] + 1 
			name = line.replace("MX 11","")

		elif words[1] not in ranks:
			ranks[words[1]] = 1

			name = line.replace(words[1],"")
		else:
			ranks[words[1]] = ranks[words[1]] + 1
			name = line.replace(words[1],"")

		if "." in name:
			fname = name.split(".")[1].lstrip()
			if len(name.split(".")) == 3:
				fname = fname + name.split(".")[2]
			if len(name.split(".")) == 4:
				fname = fname + name.split(".")[2] + name.split(".")[3]
			names.append(fname)

# 12768. Hon INSP (V) Dr Jonathan Pan Juin Yang
# 12916. CW 2 Jamaludin Bin Karmani

# 23460. SGT1 Muhammad Burhanuddin Andresetiawan Ar Bin Mohamed Abdul Raheem
# 27773. CPL Muhammad Danial Haris D’cruz Bin Muhammad Ridzwan Abdullah D’cruz
# 13982. CPL Arun
# 29392. SGT1 Ivan



# print(ranks)

sorted_list = sorted(names, key=len)
# print(len(sorted_list))
# print(sorted_list[0])
# print(sorted_list[1])
# print(sorted_list[2])
# print(sorted_list[3])
# print(sorted_list[45138])
# print(sorted_list[45139])


#  'CP': 1,
#  'DC': 4,
#  'SAC': 30, 
#  'AC': 33,
#  'DAC': 90,  
#  'SUPT 1A': 11, 
#  'SUPT': 403,
#  'DSP': 539,
#  'ASP': 1691,
#  'INSP': 2268,
#  'NSI': 10,
#  'NSPI': 5,
#  'SSI 2': 127,
#  'SSI': 170,
#  'SI': 1840,     
#  'SSSGT': 2552,
#  'SSGT': 1086,
#  'SGT3': 3024,
#  'SGT2': 6452,
#  'SGT1': 6310,
#  'SGT': 380,
#  'CPL': 12408,
#  'SC2': 1674,
#  'SC': 1358,
#  'Trainee SC': 1,
#  'PC': 140,

# 'MX 11': 2,
# 'MX 12': 2,
# 'MX 13 (I)': 11,
# 'MX14': 7,
# 'MX15': 1
# 'Mr': 791,

#  'DAC (V)': 3,
#  'SUPT (V)': 7,
#  'Hon DSP (V)': 1, 
#  'DSP (V)': 8,
#  'Hon ASP (V)': 7, 
#  'ASP (V)': 25,
#  'Hon INSP (V)': 17, 
#  'INSP (V)': 28,
#  'Acting Insp (V)': 8,
#  'SSI 2 (V)': 1, 
#  'SI (V)': 64,
#  'SSGT (V)': 99,
#  'SGT 3 (V)': 50, 
#  'SGT 2 (V)': 136,
#  'SGT 1 (V)': 201, 
#  'SGT 1 (V) - Trainee': 22,
#  'CPL (V)': 1,
#  'SC (V)': 155,
#  'VC2': 171,
#  'VC': 250,

#  'CI': 22,
#  'SSI 2 (P)': 14,
#  'SSI (P)': 52,
#  'SI (P)': 62,
#  'SSSGT (P)': 97,
#  'SSGT (P)': 82,
#  'SGT (P)': 132,

#  'CW 2': 1,




