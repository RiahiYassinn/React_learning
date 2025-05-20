import { z } from 'zod';

const eventSchema = z.object({
  name: z.string()
    .min(3, "Le nom doit contenir au moins 3 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  
  description: z.string()
    .min(10, "La description doit contenir au moins 10 caractères")
    .max(1000, "La description ne peut pas dépasser 1000 caractères"),
  
  img: z.string()
    .min(1, "L'image est requise")
    .refine(val => {
      // Simulation de vérification de taille (à adapter pour les vrais fichiers)
      // En réalité, vous devriez vérifier la taille du fichier avant l'upload
      return true; 
    }, "La taille du fichier ne doit pas dépasser 5MB"),
  
  price: z.number()
    .min(1, "Le prix doit être d'au moins 1")
    .max(1000, "Le prix ne peut pas dépasser 1000"),
  
  nbTickets: z.number()
    .min(1, "Il doit y avoir au moins 1 ticket")
    .max(100, "Il ne peut y avoir plus de 100 tickets"),
  
  nbParticipants: z.number()
    .min(0, "Le nombre de participants ne peut pas être négatif"),
  
  like: z.boolean()
});

export default eventSchema;