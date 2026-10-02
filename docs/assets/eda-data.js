/* Training-only counts using the notebook EDA tokenizer and cleaning rules. */
window.GAZETTE_EDA = {
  "frequencies": {
    "All topics": {
      "all": [
        ["the", 205478], ["to", 120746], ["a", 113299], ["of", 98652], ["in", 96425], ["and", 69678],
        ["on", 57667], ["for", 50674], ["s", 40185], ["that", 27932], ["with", 26812], ["as", 25378],
        ["at", 25068], ["its", 22122], ["is", 22098], ["new", 21427], ["by", 20942], ["said", 20267],
        ["it", 19728], ["reuters", 19340]
      ],
      "filtered": [
        ["new", 21427], ["said", 20267], ["reuters", 19340], ["ap", 16274], ["gt", 13231], ["lt", 13182],
        ["quot", 9596], ["year", 9513], ["world", 7609], ["monday", 7581], ["oil", 7545], ["wednesday", 7492],
        ["tuesday", 7413], ["thursday", 7298], ["company", 7160], ["friday", 6799], ["york", 6215],
        ["yesterday", 6032], ["iraq", 5942], ["president", 5927]
      ],
      "trial": [
        ["new", 21427], ["year", 9513], ["world", 7609], ["monday", 7581], ["oil", 7545], ["wednesday", 7492],
        ["tuesday", 7413], ["thursday", 7298], ["company", 7160], ["friday", 6799], ["york", 6215],
        ["yesterday", 6032], ["iraq", 5942], ["president", 5927], ["million", 5760], ["game", 5756],
        ["microsoft", 5702], ["time", 5494], ["week", 5360], ["says", 5345]
      ]
    },
    "World": {
      "all": [
        ["the", 49041], ["in", 32217], ["to", 31139], ["a", 30819], ["of", 28983], ["and", 17659],
        ["on", 16209], ["for", 11638], ["s", 9563], ["said", 7745], ["that", 6788], ["at", 6271]
      ],
      "filtered": [
        ["said", 7745], ["ap", 5786], ["iraq", 5471], ["reuters", 5423], ["president", 4246], ["new", 3479],
        ["afp", 3388], ["minister", 3341], ["killed", 3179], ["people", 2850], ["government", 2613],
        ["quot", 2578]
      ],
      "trial": [
        ["iraq", 5471], ["president", 4246], ["new", 3479], ["afp", 3388], ["minister", 3341],
        ["killed", 3179], ["people", 2850], ["government", 2613], ["iraqi", 2464], ["prime", 2380],
        ["bush", 2352], ["baghdad", 2207]
      ]
    },
    "Sports": {
      "all": [
        ["the", 63390], ["to", 27683], ["a", 26073], ["in", 24050], ["of", 20393], ["and", 15859],
        ["for", 13903], ["on", 12359], ["s", 10196], ["at", 9358], ["with", 8412], ["his", 7851]
      ],
      "filtered": [
        ["ap", 6261], ["game", 4269], ["new", 4163], ["season", 3617], ["win", 3491], ["team", 3387],
        ["night", 3010], ["world", 2992], ["cup", 2762], ["league", 2722], ["victory", 2657], ["year", 2603]
      ],
      "trial": [
        ["game", 4269], ["new", 4163], ["season", 3617], ["win", 3491], ["team", 3387], ["night", 3010],
        ["world", 2992], ["cup", 2762], ["league", 2722], ["victory", 2657], ["year", 2603], ["sunday", 2379]
      ]
    },
    "Business": {
      "all": [
        ["the", 44820], ["to", 30221], ["a", 29097], ["of", 22781], ["in", 22300], ["and", 17190],
        ["on", 16780], ["s", 12681], ["for", 12165], ["its", 9567], ["reuters", 8717], ["as", 8299]
      ],
      "filtered": [
        ["reuters", 8717], ["said", 7311], ["new", 6632], ["oil", 6368], ["gt", 5262], ["lt", 5234],
        ["stocks", 4518], ["prices", 4226], ["company", 4137], ["fullquote", 3626], ["percent", 3453],
        ["york", 3371]
      ],
      "trial": [
        ["new", 6632], ["oil", 6368], ["prices", 4226], ["company", 4137], ["percent", 3453], ["york", 3371],
        ["year", 3284], ["corp", 3115], ["profit", 2904], ["million", 2895], ["quarter", 2793],
        ["sales", 2786]
      ]
    },
    "Sci/Tech": {
      "all": [
        ["the", 48227], ["to", 31703], ["a", 27310], ["of", 26495], ["and", 18970], ["in", 17858],
        ["for", 12968], ["on", 12319], ["that", 9342], ["is", 7969], ["its", 7857], ["s", 7745]
      ],
      "filtered": [
        ["new", 7153], ["microsoft", 4927], ["gt", 4455], ["lt", 4441], ["ap", 3716], ["said", 3705],
        ["software", 3667], ["reuters", 3519], ["internet", 3364], ["space", 2645], ["company", 2635],
        ["quot", 2635]
      ],
      "trial": [
        ["new", 7153], ["microsoft", 4927], ["software", 3667], ["internet", 3364], ["space", 2645],
        ["company", 2635], ["search", 2328], ["computer", 2226], ["service", 2222], ["security", 2217],
        ["com", 2178], ["music", 2172]
      ]
    }
  }
};
