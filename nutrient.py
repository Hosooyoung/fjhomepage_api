#-*-coding:utf-8-*-
import numpy as np
from scipy.optimize import minimize
import pandas as pd
import json
import sys
from collections import OrderedDict
#inputData = json.loads(sys.argv[0])['data']
#file_data =OrderedDict()
input_EC=float(sys.argv[1])
input_K=int(sys.argv[2])
input_Ca=int(sys.argv[3])
input_Mg=int(sys.argv[4])
input_NO3=int(sys.argv[5])
input_H2PO4=int(sys.argv[6])
input_SO4=int(sys.argv[7])


cat=pd.DataFrame({
    "ratio":['target','able'],"K":[0,0],"Ca":[0,0],"Mg":[0,0]})
ani=pd.DataFrame({
    "ratio":['target','able'],"NO3":[0,0],"H2PO4":[0,0],"SO4":[0,0]})
element_ratio_cat={
    "Ca":[0,0,0,1,0],"K":[1,1,2,0,0],"Mg":[0,0,0,0,1]}
element_ratio_cat=pd.DataFrame(element_ratio_cat)
element_ratio_ani={
    "H2PO4":[0,1,0,0,0],"NO3":[1,0,0,2,0],"SO4":[0,0,1,0,1]}
element_ratio_ani=pd.DataFrame(element_ratio_ani)
valency_cat=[2,1,2]
valency_ani=[1,1,2]
fert=['KNO3','KH2PO4','K2SO4','Ca(NO3)2','MgSO4']
def EC_input(x):
    EC_temp=x
    convfactor=9.819
    offset=-1.462
    totalmeq_temp=convfactor*EC_temp+offset
    return totalmeq_temp
def cat_meq_rto(x):
        cat_fert_res_meq=[0,0,0]
        cat_fert_meq_sum=0
        for j in range(0,len(valency_cat)):
            for i in range(0,len(fert)):
                cat_fert_res_meq[j]+=element_ratio_cat.iloc[i,j]*valency_cat[j]*x[i]
                cat_fert_meq_sum=sum(cat_fert_res_meq)
        for i in range(0,len(valency_cat)):
            cat_fert_meq_rto_temp[i]=cat_fert_res_meq[i]/cat_fert_meq_sum*100
            cat_fert_meq_rto[i]=round(cat_fert_meq_rto_temp[i],0)
        cat.loc[cat['ratio']== 'able',['K','Ca','Mg']]=[
        cat_fert_meq_rto[0],cat_fert_meq_rto[1],cat_fert_meq_rto[2]]
        diff_temp_cat=0   
        for i in range(0,len(valency_cat)):
            diff_temp_cat+=(cat_fert_meq_rto_temp[i]-cat.iloc[0][i])**2
        return cat_fert_meq_sum,diff_temp_cat
def ani_meq_rto(x):
        ani_fert_res_meq=[0,0,0]
        ani_fert_meq_sum=0
        for j in range(0,len(valency_ani)):
            for i in range(0,len(fert)):
                ani_fert_res_meq[j]+=element_ratio_ani.iloc[i,j]*valency_ani[j]*x[i]
                ani_fert_meq_sum=sum(ani_fert_res_meq)
        for i in range(0,len(valency_ani)):
            ani_fert_meq_rto_temp[i]=ani_fert_res_meq[i]/ani_fert_meq_sum*100
            ani_fert_meq_rto[i]=round(ani_fert_meq_rto_temp[i],0)
        ani.loc[ani['ratio']== 'able',['NO3','H2PO4','SO4']]=[
        ani_fert_meq_rto[0],ani_fert_meq_rto[1],ani_fert_meq_rto[2]]
        diff_temp_ani=0
        for i in range(0,len(valency_ani)):
            diff_temp_ani+=(ani_fert_meq_rto_temp[i]-ani.iloc[0][i])**2
        return ani_fert_meq_sum,diff_temp_ani

def objective(x):
    diff=cat_meq_rto(x)[1]+ani_meq_rto(x)[1]
    return diff
def const1(x):
    cat_sum=totalmeq/2-cat_meq_rto(x)[0]
    return cat_sum
con1 ={'type':'eq','fun':const1}
cons=([con1])
x0=np.ones(len(fert))
b=(0,10000)
bnds=(b,b,b,b,b)
totalmeq=EC_input(input_EC)
cat.loc[cat['ratio']== 'target', ['K','Ca','Mg']]= [input_K,input_Ca,input_Mg]
ani.loc[ani['ratio']== 'target', ['NO3','H2PO4','SO4']]= [input_NO3,input_H2PO4,input_SO4]
cat_fert_res_meq=[0,0,0]
cat_fert_meq_sum=0
cat_fert_meq_rto=[0,0,0]
cat_fert_meq_rto_temp=[0,0,0]
ani_fert_res_meq=[0,0,0]
ani_fert_meq_sum=0
ani_fert_meq_rto=[0,0,0]
ani_fert_meq_rto_temp=[0,0,0]
solution=minimize(objective,x0,method='SLSQP',bounds=bnds,constraints=cons)
x=solution.x

#print("thisis.0")
#print(cat.iloc[0])
#print("thisis.1")
#print(cat.iloc[1])
for i in range(0,len(fert)):
   print(x[i])
for i in range(0,3):
    print(cat.loc[1][i])
for i in range(0,3):
    print(ani.loc[1][i])
sys.exit()