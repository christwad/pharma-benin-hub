
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { supabase } from "@/lib/supabase";

const PharmacyVerificationPage = () => {
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (!email || !code) {
      toast({
        title: "Informations manquantes",
        description: "Veuillez entrer votre email et le code de vérification",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    
    try {
      // Vérifier le code OTP
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Vérification réussie",
        description: "Votre identité a été vérifiée. Votre demande est maintenant en attente d'approbation par notre équipe.",
      });
      
      // Rediriger vers une page de confirmation après vérification
      navigate("/pharmacy-verification-success");
    } catch (error: any) {
      console.error("Erreur de vérification:", error);
      toast({
        title: "Code invalide",
        description: error.message || "Le code de vérification que vous avez saisi est incorrect. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast({
        title: "Email requis",
        description: "Veuillez entrer votre adresse email pour recevoir un nouveau code",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email
      });

      if (error) throw error;

      toast({
        title: "Code renvoyé",
        description: "Un nouveau code de vérification a été envoyé à votre adresse email.",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de l'envoi du code",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Vérification du compte pharmacie</CardTitle>
              <CardDescription className="text-center">
                Entrez le code à 6 chiffres que vous avez reçu
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Adresse email</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded"
                  placeholder="votre.email@example.com"
                  required
                />
              </div>
              
              <div className="flex justify-center my-6">
                <InputOTP maxLength={6} value={code} onChange={setCode}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              
              <Button 
                className="w-full bg-benin-green hover:bg-benin-green/90"
                onClick={handleVerify}
                disabled={isVerifying || code.length !== 6 || !email}
              >
                {isVerifying ? "Vérification en cours..." : "Vérifier"}
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center w-full">
                <Button 
                  variant="link" 
                  className="text-benin-green"
                  onClick={handleResendCode}
                  disabled={!email}
                >
                  Renvoyer le code
                </Button>
              </div>
              <p className="text-xs text-center text-gray-500">
                Une fois votre identité vérifiée, votre demande sera examinée par notre équipe administrative. 
                Ce processus peut prendre de 24 à 48 heures ouvrables.
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PharmacyVerificationPage;
