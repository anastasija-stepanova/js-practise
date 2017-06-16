<?php

class Tv
{
    const defaultChannel = 1;
    private $onState;
    private $channelNum;
    private $lastVisibleChannel = false;

    public function __construct($amountChannels)
    {
        $this->amountChannels = $amountChannels;
    }

    public function switchOn()
    {
        if (!($this->onState))
        {
            $this->onState = true;
            if (!($this->lastVisibleChannel))
            {
                $this->switchChannel($this::defaultChannel);
            }
            else
            {
                $this->switchChannel($this->lastVisibleChannel);
            }
        }
    }

    public function switchOff()
    {
        if ($this->onState)
        {
            $this->onState = false;
            $this->lastVisibleChannel = $this->channelNum;
        }
    }

    public function switchChannel($channelNum)
    {
        if ($channelNum === null)
        {
            $this->channelNum = $this::defaultChannel;
        }
        elseif (($channelNum <= $this->amountChannels) && ($channelNum >= $this::defaultChannel))
        {
            $this->channelNum = $channelNum;
        }
    }

    public function showState()
    {
        if ($this->onState)
        {
            echo 'Телевизор включен на канале №', $this->channelNum, EOL;
        }
        elseif (!($this->onState))
        {
            echo 'Телевизор выключен', EOL;
        }
    }
}