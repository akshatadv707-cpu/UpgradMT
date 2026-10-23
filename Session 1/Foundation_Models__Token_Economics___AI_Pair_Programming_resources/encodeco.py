import tiktoken


text='''Hallucination: 
when a language model generates text that is factually incorrect, 
fabricated, or not grounded in its input context — 
but stated confidently as fact.
'''

encoding=tiktoken.get_encoding("cl100k_base")

tokens=encoding.encode(text)

print(tokens)
print(len(tokens))

print("-----------------------------------")

decode=[encoding.decode([i]) for i in tokens]
print(decode)


print("-----------------------------------")

ip_token=100
op_token=200

cost_per_million=200

divide=1000000

cost=(( ip_token /divide) * cost_per_million) + (( op_token / divide ) * cost_per_million)

print("cost: in $"+str(cost))

cost_INR=cost*82.5
print(f"cost in INR:RP{cost_INR}")
print("-----------------------------------")
