import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';


export default function DonarScreen() {
  const [activeTab, setActiveTab] = useState('donar');

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>

      {/* -------------------- HEADER STATS -------------------- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donar Medicamentos</Text>
        <Text style={styles.headerSubtitle}>Tu donación salva vidas</Text>

        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>47</Text>
            <Text style={styles.statLabel}>Tus donaciones</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>Personas ayudadas</Text>
          </View>
        </View>
      </View>

      {/* -------------------- TABS -------------------- */}
      <View style={styles.tabContainer}>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'donar' && styles.tabActive]}
          onPress={() => setActiveTab('donar')}
        >
          <Text style={styles.tabText}>Donar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabButton, activeTab === 'historial' && styles.tabActive]}
          onPress={() => setActiveTab('historial')}
        >
          <Text style={styles.tabText}>Mis Donaciones</Text>
        </TouchableOpacity>

      </View>


      {/* -------------------- TAB: DONAR -------------------- */}
      {activeTab === 'donar' && (
        <View>

          {/* Aviso */}
          <View style={styles.noticeCard}>
            <Ionicons name="alert-circle-outline" size={20} color="#555" />
            <Text style={styles.noticeText}>
              Asegúrate de que los medicamentos no estén vencidos.
            </Text>
          </View>

          <Text style={styles.sectionTitle}>Más Necesitados Ahora</Text>

          {/* Lista de medicamentos (estáticos por ahora) */}
          {[
            { name: "Paracetamol", tag: "Urgente", tagColor: "#e63946" },
            { name: "Insulina", tag: "Alta demanda", tagColor: "#f77f00" },
            { name: "Amoxicilina", tag: "Demanda media", tagColor: "#f4a261" },
          ].map((item, index) => (
            <View key={index} style={styles.medCard}>
              <View style={{ flex: 1 }}>
                <Text style={styles.medName}>{item.name}</Text>
                <Text style={styles.medTag(item.tagColor)}>{item.tag}</Text>
              </View>

              <TouchableOpacity style={styles.donateBtn}>
                <Text style={styles.donateBtnText}>Donar</Text>
              </TouchableOpacity>
            </View>
          ))}


          {/* -------------------- FORMULARIO -------------------- */}
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Donar Otro Medicamento</Text>

            <TextInput style={styles.input} placeholder="Nombre del medicamento" />
            <TextInput style={styles.input} placeholder="Cantidad" keyboardType="numeric" />
            <TextInput style={styles.input} placeholder="Fecha de vencimiento (dd/mm/aaaa)" />
            <TextInput style={styles.input} placeholder="Notas (Opcional)" />

            <TouchableOpacity style={styles.submitBtn}>
              <Ionicons name="heart-outline" size={18} color="#fff" />
              <Text style={styles.submitText}>Confirmar Donación</Text>
            </TouchableOpacity>
          </View>

        </View>
      )}


      {/* -------------------- TAB: HISTORIAL -------------------- */}
      {activeTab === 'historial' && (
        <View>
          <Text style={styles.sectionTitle}>Tus donaciones anteriores</Text>

          <View style={styles.historyCard}>
            <Text>Insulina - 2 cajas</Text>
            <Text style={{ color: '#999', fontSize: 12 }}>03/11/2025</Text>
          </View>

          <View style={styles.historyCard}>
            <Text>Paracetamol - 10 tabletas</Text>
            <Text style={{ color: '#999', fontSize: 12 }}>20/10/2025</Text>
          </View>

        </View>
      )}


    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 50,
  },

  /* ---------------- HEADER ---------------- */
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#fff",
    marginTop: 4,
  },
  header: {
    backgroundColor: "#007bff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  statCard: {
    backgroundColor: "#ffffff33",
    width: "48%",
    borderRadius: 10,
    padding: 10,
  },

  statValue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },

  statLabel: {
    color: "#fff",
    marginTop: 4,
  },

  /* ---------------- TABS ---------------- */
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#eee",
    borderRadius: 20,
    marginBottom: 20,
  },

  tabButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },

  tabText: {
    fontWeight: "bold",
    color: "#555",
  },

  tabActive: {
    backgroundColor: "#fff",
    borderRadius: 20,
  },


  /* ---------------- NOTICE ---------------- */
  noticeCard: {
    backgroundColor: "#e9f2ff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  noticeText: {
    flex: 1,
    color: "#333",
  },

  /* ---------------- BACKGROUND SECTIONS ---------------- */
  sectionTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },

  /* ---------------- MEDICINE LIST ---------------- */
  medCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },

  medName: {
    fontWeight: "bold",
    fontSize: 16,
  },

  medTag: (color) => ({
    backgroundColor: color + "20",
    color,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
    alignSelf: "flex-start",
  }),

  donateBtn: {
    backgroundColor: "#ff4444",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
  },

  donateBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },


  /* ---------------- FORM ---------------- */
  formCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },

  formTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },

  submitBtn: {
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 10,
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },


  /* ---------------- HISTORY ---------------- */
  historyCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 10,
  },

});