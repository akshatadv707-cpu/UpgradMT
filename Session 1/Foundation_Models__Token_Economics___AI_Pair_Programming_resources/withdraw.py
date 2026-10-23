def withdraw(balance, amount):
    try:
        if amount <= 0:
            raise ValueError("Amount must be greater than zero.")
        if amount > balance:
            raise ValueError("Insufficient balance.")
        return balance - amount
    except ValueError as e:
        print(f"Error: {e}")
        return balance


new_balance = withdraw(100,0.1)
print(new_balance) 