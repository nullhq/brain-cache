# the python solution of the tribonacci sequence problem
# the tribonacci sequence is a generalization of the fibonacci sequence where each term is the sum of the three preceding terms
def tribonacci_sequence(start_sequence, length):
    output_sequence = []

    if length <= 0:
        return []

    if not len(start_sequence) == 3:
        print("error: the length of the starting sequence should exactly be three")

    i = 0
    while (i < length):
        if (i<3):
            output_sequence.append(start_sequence[i]) # add the starting sequence to the output sequence
        else:
            current_length = len(output_sequence)
            summ = output_sequence[current_length -1] + output_sequence[current_length -2] + output_sequence[current_length -3]
            output_sequence.append(summ) # add the sum of the last three elements to the output sequence
        i+=1
    return output_sequence