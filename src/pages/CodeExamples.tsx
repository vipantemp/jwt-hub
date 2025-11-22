import { useState } from "react";
import { Copy, Check, Home } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Footer } from "@/components/Footer";
import { SyntaxHighlighter } from "@/components/SyntaxHighlighter";

const CodeExamples = () => {
  const [copiedLanguage, setCopiedLanguage] = useState<string | null>(null);

  const handleCopy = (code: string, language: string) => {
    navigator.clipboard.writeText(code);
    setCopiedLanguage(language);
    setTimeout(() => setCopiedLanguage(null), 2000);
  };

  const codeExamples = {
    javascript: `// JavaScript JWT Verification Example
import jwt from 'jsonwebtoken';

// Your secret key
const secret = 'your-secret-key';

// JWT token to verify
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

try {
  // Verify the token
  const decoded = jwt.verify(token, secret);
  console.log('Token is valid:', decoded);
} catch (error) {
  console.error('Token verification failed:', error.message);
}`,
    typescript: `// TypeScript JWT Verification Example
import * as jwt from 'jsonwebtoken';

// Define payload interface
interface JwtPayload {
  sub: string;
  name: string;
  iat: number;
  exp: number;
}

// Your secret key
const secret: string = 'your-secret-key';

// JWT token to verify
const token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...';

try {
  // Verify the token
  const decoded = jwt.verify(token, secret) as JwtPayload;
  console.log('Token is valid:', decoded);
} catch (error) {
  console.error('Token verification failed:', error);
}`,
    java: `// Java JWT Verification Example
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import javax.crypto.spec.SecretKeySpec;
import java.security.Key;

public class JwtVerifier {
    public static void main(String[] args) {
        // Your secret key
        String secret = "your-secret-key";
        
        // JWT token to verify
        String token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
        
        try {
            // Create signing key
            Key key = new SecretKeySpec(secret.getBytes(), 
                                       SignatureAlgorithm.HS256.getJcaName());
            
            // Verify and parse the token
            var claims = Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
                
            System.out.println("Token is valid: " + claims);
        } catch (Exception e) {
            System.err.println("Token verification failed: " + e.getMessage());
        }
    }
}`,
    python: `# Python JWT Verification Example
import jwt
from datetime import datetime

# Your secret key
secret = 'your-secret-key'

# JWT token to verify
token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'

try:
    # Verify the token
    decoded = jwt.decode(token, secret, algorithms=['HS256'])
    print('Token is valid:', decoded)
except jwt.ExpiredSignatureError:
    print('Token has expired')
except jwt.InvalidTokenError as e:
    print('Token verification failed:', str(e))`,
    csharp: `// C# JWT Verification Example
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;

public class JwtVerifier
{
    public static void Main()
    {
        // Your secret key
        var secret = "your-secret-key";
        
        // JWT token to verify
        var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";
        
        try
        {
            // Create token handler
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(secret);
            
            // Verify the token
            tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            }, out SecurityToken validatedToken);
            
            Console.WriteLine("Token is valid: " + validatedToken);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Token verification failed: " + ex.Message);
        }
    }
}`,
    go: `// Go JWT Verification Example
package main

import (
    "fmt"
    "github.com/golang-jwt/jwt/v5"
)

func main() {
    // Your secret key
    secret := []byte("your-secret-key")
    
    // JWT token to verify
    tokenString := "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    
    // Parse and verify the token
    token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
        // Verify signing method
        if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
            return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
        }
        return secret, nil
    })
    
    if err != nil {
        fmt.Println("Token verification failed:", err)
        return
    }
    
    if claims, ok := token.Claims.(jwt.MapClaims); ok && token.Valid {
        fmt.Println("Token is valid:", claims)
    } else {
        fmt.Println("Invalid token")
    }
}`,
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/40 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/">
              <Button variant="ghost" size="icon">
                <Home className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              JWT Code Examples
            </h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Verify JWT in Your Language</h2>
            <p className="text-muted-foreground">
              Select your programming language to see JWT verification examples
            </p>
          </div>

          <Tabs defaultValue="javascript" className="w-full">
            <TabsList className="grid grid-cols-3 lg:grid-cols-6 gap-2 h-auto p-2">
              <TabsTrigger value="javascript">JavaScript</TabsTrigger>
              <TabsTrigger value="typescript">TypeScript</TabsTrigger>
              <TabsTrigger value="java">Java</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="csharp">C#</TabsTrigger>
              <TabsTrigger value="go">Go</TabsTrigger>
            </TabsList>

            {Object.entries(codeExamples).map(([language, code]) => (
              <TabsContent key={language} value={language} className="mt-4">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(code, language)}
                    className="absolute top-2 right-2 z-10"
                  >
                    {copiedLanguage === language ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <div className="p-6 pt-12 rounded-lg bg-muted/30 overflow-x-auto border border-border/50">
                    <SyntaxHighlighter code={code} language={language} />
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Card>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CodeExamples;
