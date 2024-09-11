'use client';

import React, {useMemo, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {ColDef} from 'ag-grid-community';

import {Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog';
import EntityForm from '@/form/EntityForm';
import {Company, Contact, CreateEntityMutation, GetEntitiesQuery, UpdateEntityMutation} from '@/types/generated';
import {GET_ENTITIES} from '@/graphql/queries/entities';
import {CREATE_ENTITY, UPDATE_ENTITY} from '@/graphql/mutations/entities';
import {EntityType} from '@/constant/entities';
import {Accordion} from '@/components/ui/accordion';
import Header from '@/components/Header/header';
import AccordionList from '@/components/AccordionList/AccordionList';
import SkeletonHeader from '@/components/Skeletons/Header/Header';
import SkeletonAccordionList from '@/components/Skeletons/AccordionList/SkeletonAccordionList';
import {CompanyFormData, ContactFormData} from '@/types/forms';

export default function HomePage() {
  const { data, loading, error } = useQuery<GetEntitiesQuery>(GET_ENTITIES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createEntity] = useMutation<CreateEntityMutation>(CREATE_ENTITY);
  const [updateEntity] = useMutation<UpdateEntityMutation>(UPDATE_ENTITY);
  const [selectedEntityForEdit, setSelectedEntityForEdit] = useState<Company | Contact | null>(null);
  const [entityType, setEntityType] = useState<EntityType>();
  const handleCreateEntity = async (entityType: EntityType, formData: CompanyFormData | ContactFormData) => {
    const input = { entityType, ...formData };

    try {
      await createEntity({
        variables: { input },
        refetchQueries: [{ query: GET_ENTITIES }],
      });
    } catch (error) {
      console.error('Error creating entity:', error); 
    }
  };
  const handleUpdateEntity = async ( formData: CompanyFormData | ContactFormData, id: string) => {
    const input = {  id, ...formData, entityType: entityType};

    try {
      await updateEntity({
        variables: { input },
        refetchQueries: [{ query: GET_ENTITIES }],

      });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error updating entity:', error);
      setIsDialogOpen(false);
    }
  };
  const companies = useMemo(() => {
    if (!data || !data.getEntities) return [];
    return data.getEntities.filter((entity): entity is Company => entity !== null && 'industry' in entity);
  }, [data]);

  const contacts = useMemo(() => {
    if (!data || !data.getEntities) return [];
    return data.getEntities.filter((entity): entity is Contact => entity !== null && 'phone' in entity);
  }, [data]);

  const companyColumnDefs: ColDef[] = useMemo(() => getColumnDefs(EntityType.COMPANY), []);
  const contactColumnDefs: ColDef[] = useMemo(() => getColumnDefs(EntityType.CONTACT), []);

  const handleRowClick = (rowData: Company | Contact) => {
    setEntityType('industry' in rowData ? EntityType.COMPANY :  EntityType.CONTACT);
    setIsDialogOpen(true);
    setSelectedEntityForEdit(rowData);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <SkeletonHeader/>

        <Accordion type="multiple" className="mt-6 space-y-4" defaultValue={['company-list-skeleton', 'contact-list-skeleton']}>
          <SkeletonAccordionList value={'company-list-skeleton'}/>
          <SkeletonAccordionList value={'contact-list-skeleton'}/>
        </Accordion>
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <Header />

      <Accordion type="multiple" className="mt-6 space-y-4">
        <AccordionList
          entityType={EntityType.COMPANY}
          rowData={companies}
          columnDefs={companyColumnDefs}
          onAddEntity={handleCreateEntity}
          onRowClicked={handleRowClick}
        />
        <AccordionList
          entityType={EntityType.CONTACT}
          rowData={contacts}
          columnDefs={contactColumnDefs}
          onAddEntity={handleCreateEntity}
          onRowClicked={handleRowClick}
        />
      </Accordion>

      {selectedEntityForEdit && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogTitle>Edit {entityType}</DialogTitle>
            <EntityForm
              entityType={entityType}
              entity={selectedEntityForEdit}
              onSubmit={(formData, id ='') => {
                handleUpdateEntity(formData, id);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

const getColumnDefs = (entityType: EntityType): ColDef[] => [
  { headerName: 'Name', field: 'name', flex: 1 },
  ...(entityType === EntityType.COMPANY
    ? [
      { headerName: 'Industry', field: 'industry', flex: 1 },
      { headerName: 'Contact Email', field: 'contactEmail', flex: 1 },
    ]
    : [
      { headerName: 'Email', field: 'email', flex: 1 },
      { headerName: 'Phone', field: 'phone', flex: 1 },
    ]),
];
