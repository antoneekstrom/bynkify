
import { Lexer, Tagger } from 'pos';

export interface BynkifyResult {
    input : string;
    output : string;
    words : string[];
    parsedWords : ParsedWord[];
}

export interface BynkifyOptions {
    frequency : number;
    replaceVerbs : boolean;
}

export const defaultOptions : BynkifyOptions = {
    frequency: 0.5,
    replaceVerbs: true
}

export const TAG_NOUN = "NN";
export const TAG_VERB = "VB";

export const BYNK_NOUN = "bynk";
export const BYNK_VERB = "bynka";

interface ParsedWord {
    word : string;
    tag : string;
}

function isNoun(tag : string) : boolean {
    return tag.includes(TAG_NOUN);
}

function isVerb(tag : string) : boolean {
    return tag.includes(TAG_VERB);
}

function processWord(word : ParsedWord, options : BynkifyOptions) : string {
    const tag = word.tag;

    const r = Math.random();

    const noun = isNoun(tag);
    const verb = isVerb(tag);

    if (noun || (options.replaceVerbs && verb) && r <= options.frequency) {
        return noun ? BYNK_NOUN : BYNK_VERB;
    }
    else {
        return word.word;
    }
}

export function bynkify(text : string, options ?: BynkifyOptions) : BynkifyResult {

    const options_ = options ? options : defaultOptions;

    let tagger = new Tagger();
    let lexer = new Lexer();

    let words : string[] = lexer.lex(text);
    let parsedWords : ParsedWord[] = tagger.tag(words).map((tagged) => {
        return {
            word: tagged[0],
            tag: tagged[1]
        };
    });

    let resultWords : string[] = parsedWords.map((w) => processWord(w, options_));

    let result : BynkifyResult = {
        input: text,
        output: resultWords.join(" "),
        words: words,
        parsedWords: parsedWords
    };

    console.log(result);

    return result;
}