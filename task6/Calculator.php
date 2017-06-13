<?php

class Calculator
{
    private $arg1;
    private $arg2;
    private $operation;

    private function calculate()
    {
        switch ($this->operation)
        {
            case 'sum':
                return $this->arg1 + $this->arg2;
                break;
            case 'sub':
                return $this->arg1 - $this->arg2;
                break;
            case 'mul':
                return $this->arg1 * $this->arg2;
                break;
            case 'div':
                return $this->arg1 / $this->arg2;
                break;
            default:
                return 'Неизвестная операция';
        }
    }

    public function getResult($arg1, $arg2, $operation)
    {
        $this->arg1 = $arg1;
        $this->arg2 = $arg2;
        $this->operation = $operation;
        return $this->calculate();
    }
}