# rm $(find . -name '.DS_Store')

find ./src -type f ! -name "*.css" -print0 | while IFS= read -r -d $'\0' line; do
    echo "\n\n# $line\n"
    awk '{printf "%d\t%s\n", NR, $0}' < "$line"
done
