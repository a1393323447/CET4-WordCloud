import json
from collections import Counter
from wordcloud import WordCloud

words = json.load(open(r"words.json", encoding="utf-8"))
stopwords = list(set(words))

# Filter out stop words
words = filter(lambda x: x in stopwords, words)

# Filter out words with length <= 1
words = filter(lambda x: len(x) > 1, words)

# Select top 100 words based on their occurrence
counter = Counter(list(words))

most_common_words = counter.most_common()

# wordcloud = WordCloud(
#     width=19200, height=1080, colormap="Blues",
# ).generate_from_frequencies(dict(most_common_words[200:300]))

# im = wordcloud.to_image()
# im.save("word-cloud.png")

with open("word.txt", encoding="utf-8", mode="w") as f:
    for word in most_common_words:
        f.write(word[0] + "\t\t" + str(word[1]) + "\n")