<?php

class Calculator
{
    const SUM = 'sum';
    const SUB = 'sub';
    const MUL = 'mul';
    const DIV = 'div';

    public function calculate($arg1, $arg2, $operation)
    {
        $result = null;
        switch ($operation)
        {
            case $this::SUM:
                $result = $arg1 + $arg2;
                break;
            case $this::SUB:
                $result = $arg1 - $arg2;
                break;
            case $this::MUL:
                $result = $arg1 * $arg2;
                break;
            case $this::DIV:
                if ($arg2 != 0)
                {
                    $result = $arg1 / $arg2;
                    break;
                }
                else
                {
                    return 'div0';
                }
            default:
                return 'undefinedOp';
        }
        return $result;
    }
}