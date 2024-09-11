'use client';

import React, {useMemo, useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import {ColDef} from 'ag-grid-community';
import {toast} from 'sonner';

import {Dialog, DialogContent, DialogTitle} from '@/components/ui/dialog';
import EntityForm, {ICompany, IContact} from '@/form/EntityForm';
import {Company, Contact, CreateEntityMutation, GetEntitiesQuery, UpdateEntityMutation} from '@/types/generated';
import {GET_ENTITIES} from '@/graphql/queries/entities';
import {CREATE_ENTITY, UPDATE_ENTITY} from '@/graphql/mutations/entities';
import {Accordion} from '@/components/ui/accordion';
import Header from '@/components/Header/header';
import AccordionList from '@/components/AccordionList/AccordionList';
import SkeletonHeader from '@/components/Skeletons/Header/Header';
import SkeletonAccordionList from '@/components/Skeletons/AccordionList/SkeletonAccordionList';
import {CompanyFormData, ContactFormData} from '@/types/forms';
import {LocalEntityType} from '@/constant/entities';
import {ToastNegative, ToastPositive} from '@/components/ui/Toast/toast';

import {EntityType} from '../../__generated__/globalTypes';


export default function HomePage() {
  const {data, loading, error} = useQuery<GetEntitiesQuery>(GET_ENTITIES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [createEntity] = useMutation<CreateEntityMutation>(CREATE_ENTITY);
  const [updateEntity] = useMutation<UpdateEntityMutation>(UPDATE_ENTITY);
  const [selectedEntityForEdit, setSelectedEntityForEdit] = useState<ICompany | IContact | null>(null);
  const [entityType, setEntityType] = useState<LocalEntityType>();

  const handleCreateEntity = async (entityType: LocalEntityType, formData: CompanyFormData | ContactFormData) => {
    const input = {entityType: entityType === LocalEntityType.COMPANY ? EntityType.COMPANY : EntityType.CONTACT, ...formData};

    try {
      const res = await createEntity({
        variables: {input},
        refetchQueries: [{query: GET_ENTITIES}],
      });
      if (res?.errors && res?.errors?.length > 0) {
        toast(
          <ToastNegative title="Error creating entity" description="Something went wrong while creating the entity." />,
        );

        return;
      }
      toast(
        <ToastPositive
          title={`${entityType} created successfully!🎉`}
        />);
    } catch (error) {
      toast(
        <ToastNegative title="Error creating entity" description="Something went wrong while creating the entity." />,
      );
    }
  };

  const handleUpdateEntity = async (formData: CompanyFormData | ContactFormData, id: string) => {
    const input = {
      id, ...formData,
      entityType: entityType === LocalEntityType.COMPANY ? EntityType.COMPANY : EntityType.CONTACT,
    };
    try {
      const res = await updateEntity({
        variables: {input},
        refetchQueries: [{query: GET_ENTITIES}],
      });
      setIsDialogOpen(false);
      if (res?.errors && res?.errors?.length > 0) {
        toast(
          <ToastNegative title="Error creating entity" description="Something went wrong while creating the entity." />,
        );

        return;
      }

      toast(
        <ToastPositive
          title={`${entityType} updated successfully!🎉`}
        />, {
          unstyled: true,
        },
      );
    } catch (error) {
      console.error('Error updating entity:', error);
      setIsDialogOpen(false);
    }
  };

  const companies = useMemo<ICompany[]>(() => {
    if (data && data.getEntities) {
      return data.getEntities
        .filter((entity) => entity?.__typename === 'Company')
        .map((entity) => {
          const company = entity as Company;
          return {
            id: company?.id,
            name: company?.name,
            industry: company?.industry || '',
            contactEmail: company?.contactEmail || '',
          };
        });
    }
    return [];
  }, [data]);

  const contacts = useMemo<IContact[]>(() => {
    if (data && data.getEntities) {
      return data.getEntities
        .filter((entity) => entity?.__typename === 'Contact')
        .map((entity) => {
          const contacts = entity as Contact;

          return {
            id: contacts?.id,
            name: contacts?.name,
            email: contacts?.email || '',
            phone: contacts?.phone || '',
          };
        });
    }
    return [];
  }, [data]);

  const companyColumnDefs: ColDef[] = useMemo(() => getColumnDefs(LocalEntityType.COMPANY), []);
  const contactColumnDefs: ColDef[] = useMemo(() => getColumnDefs(LocalEntityType.CONTACT), []);

  const handleRowClick = (rowData: ICompany | IContact, entityTypeClicked: LocalEntityType) => {
    setEntityType(entityTypeClicked);
    setIsDialogOpen(true);
    setSelectedEntityForEdit(rowData);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <SkeletonHeader/>

        <Accordion type="multiple" className="mt-6 space-y-4"
          defaultValue={['company-list-skeleton', 'contact-list-skeleton']}>
          <SkeletonAccordionList value={'company-list-skeleton'}/>
          <SkeletonAccordionList value={'contact-list-skeleton'}/>
        </Accordion>
      </div>
    );
  }

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <Header/>
      <Accordion type="multiple" className="mt-6 space-y-4">
        <AccordionList
          entityType={LocalEntityType.COMPANY}
          rowData={companies}
          columnDefs={companyColumnDefs}
          onAddEntity={handleCreateEntity}
          onRowClicked={handleRowClick}
        />
        <AccordionList
          entityType={LocalEntityType.CONTACT}
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
              onSubmit={(formData, id = '') => {
                handleUpdateEntity(formData, id);
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

const getColumnDefs = (entityType: LocalEntityType): ColDef[] => [
  {headerName: 'Name', field: 'name', flex: 1},
  ...(entityType === LocalEntityType.COMPANY
    ? [
      {headerName: 'Industry', field: 'industry', flex: 1},
      {headerName: 'Contact Email', field: 'contactEmail', flex: 1},
    ]
    : [
      {headerName: 'Email', field: 'email', flex: 1},
      {headerName: 'Phone', field: 'phone', flex: 1},
    ]),
];
