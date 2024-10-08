import supabase from "./supabase";
import toast from "react-hot-toast";

export async function getSettings() {
  try {
    let { data: settings, error } = await supabase.from("settings").select("*");

    if (error) throw error;
    console.log("Settings data:", settings);
    return settings;
  } catch (error) {
    console.error("Error loading settings:", error.message);
    throw new Error("Settings could not be loaded");
  }
}

export async function updateSettings(newSettings) {
  try {
    const { data, error } = await supabase
      .from("settings")
      .update({
        name: newSettings.name,
        industry: newSettings.industry,
        city: newSettings.city,
        website: newSettings.website,
        last_review: newSettings.last_review,
        status: newSettings.status,
        reminder: newSettings.reminder,
        dark_mode: newSettings.dark_mode,
      })
      .eq("id", 1)
      .select();

    if (error) throw error;
    console.log("Settings updated successfully:", data);
    return data; // Return the updated data if needed
  } catch (error) {
    console.error("Error updating settings:", error.message);
    throw new Error("Settings could not be updated");
  }
}
