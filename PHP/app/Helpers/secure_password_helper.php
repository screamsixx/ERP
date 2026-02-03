<?php

if (!function_exists('hashPassword')) {
    function hashPassword($plainPassword)
    {
        return password_hash($plainPassword, PASSWORD_BCRYPT);
    }
}

if (!function_exists('verifyPassword')) {
    function verifyPassword($plainPassword, $hashedPassword)
    {
        return password_verify($plainPassword, $hashedPassword);
    }
}