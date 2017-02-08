import textwrap as tw


def dedent(param):
    def dedent_proc(param):
        if isinstance(param, dict):
            return dedent_dict(param)
        elif isinstance(param, basestring):
            return dedent_basestring(param)
        elif isinstance(param, (list, tuple)):
            return dedent_list(param)
        else:
            return param

    def dedent_dict(param):
        for item in param:
            param[item] = dedent_proc(param[item])
        return param

    def dedent_basestring(param):
        return __do_dedent(param)

    def dedent_list(param):
        to_return = []
        for item in param:
            to_return.append(dedent_proc(item))
        return to_return

    return dedent_proc(param)


def __do_dedent(string):
    string_ = list(string)
    cnt_to_replace = 0

    if string[0] != "\n":
        raise Exception("string show begin with line break and be "
                        "ident based on this quotes. Ex:"
                        "\na = \"\"\"\n    string....\"\"\"")

    for x in range(1, len(string_)):
        if string_[x] != " ":
            cnt_to_replace = x - 1
            break
    spaces_to_replace = " " * cnt_to_replace

    return ''.join(string_).replace("\n" + spaces_to_replace, '')
